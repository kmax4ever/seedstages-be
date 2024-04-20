import { ResponseStatus } from '@/modules/common/const/general'
import { Erc20__factory } from '@/types'
import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import BigNumber from 'bignumber.js'
import {
  ethers,
  WebSocketProvider,
  AbiCoder,
  JsonRpcProvider,
  id
} from 'ethers'
import { differenceBy } from 'lodash'
import { SyncStatusService } from '@/modules/resources/sync-status/sync-status.service'
import { SyncHandleService } from './syncHandle.service'
import { waitMs } from '@/utils/helper'
import { CONTRACT_NEED_SYNC, ZERO_ADDRESS } from '@/config/constanst'
import { ProjectsService } from '@/modules/resources/projects/projects.service'
import { IouTokensService } from '@/modules/resources/iou-token/iou-token.service'
import { SeedstagesService } from '@/modules/resources/seedstage/seedstage.service'
import { SeedstageRoundsService } from '@/modules/resources/seedstage-round/seedstage-round.service'
import { DepositHistorysService } from '@/modules/resources/deposit-history/deposit-history.service'
var CONTRACT_SYNC = CONTRACT_NEED_SYNC
@Injectable()
export class EthersService implements OnModuleInit {
  private lastBlockSynced: number
  private incrementBlock = Number(process.env.INCREMENT_BLOCK || 20)
  private inititalBlockNum = Number(process.env.INIT_BLOCK_SYNC || 1000000)
  private delayBlock = Number(process.env.DELAY_BLOCK || 5)
  private version = Number(process.env.VERSION || 1)
  constructor(
    private readonly configService: ConfigService,
    private readonly syncStatusService: SyncStatusService,
    private readonly syncHandleService: SyncHandleService,
    private readonly projectsService: ProjectsService,
    private readonly iouTokensService: IouTokensService,
    private readonly seedstagesService: SeedstagesService,
    private readonly seedstageRoundsService: SeedstageRoundsService,
    private readonly depositHistorysService: DepositHistorysService
  ) {}

  async onModuleInit() {
    if (this.configService.get('IS_SYNC') == 'true') {
      this.start()
    }
  }

  async initSync() {
    const syncStatus = await this.syncStatusService.getSyncStatus()
    if (!syncStatus) {
      await this.syncStatusService.initData(this.inititalBlockNum)
    }

    if (syncStatus && syncStatus.lastBlockSynced != 0) {
      this.lastBlockSynced = syncStatus.lastBlockSynced
    } else {
      this.lastBlockSynced = this.inititalBlockNum
    }
    const seedstages = await this.seedstagesService.getSeedStageAddres()
    CONTRACT_SYNC.push(...seedstages)
  }
  async start() {
    console.log(`initializing...`)
    await this.initSync()

    console.log(`Starting sync...`)
    const loopFunc = async () => {
      await waitMs(1000)
      await this.sync()
      process.nextTick(loopFunc)
    }
    loopFunc()
  }
  async sync() {
    try {
      const lastestBlock =
        +(await this.syncHandleService.getlastestBlock()) - this.delayBlock
      if (lastestBlock <= 0) {
        console.log(`[Ether services]: up to date`)
        return
      }

      if (this.lastBlockSynced == lastestBlock) {
        console.log(` ------------[UP TO DATE]---------------`)
        await waitMs(1000)
        return
      }
      let toBlock = this.lastBlockSynced + this.incrementBlock
      if (toBlock >= lastestBlock) {
        toBlock = lastestBlock
      }

      let fromBlock = this.lastBlockSynced + 1
      if (this.lastBlockSynced > lastestBlock) {
        fromBlock = this.lastBlockSynced + 1
      }
      console.log({ fromBlock, toBlock })

      if (fromBlock > toBlock) {
        return
      }

      await this._processLogs(fromBlock, toBlock, CONTRACT_SYNC)
      await this.syncStatusService.updateLastBlock(toBlock, this.version)

      this.lastBlockSynced = toBlock
    } catch (error) {
      console.log(error)
    }
  }

  private async _processLogs(fromBlock, toBlock, CONTRACT_SYNC = []) {
    console.log(CONTRACT_SYNC)
    console.log(
      `${'[SYNC EVENTS]'} get events from block ${fromBlock} to block ${toBlock}`
    )

    let logs = await this.syncHandleService.getLogs(
      fromBlock,
      toBlock,
      CONTRACT_SYNC as any
    )

    logs.sort((a: any, b: any) => {
      if (a.blockNumber === b.blockNumber) {
        return a.logIndex - b.logIndex
      } else {
        return a.blockNumber - b.blockNumber
      }
    })

    const events = this.syncHandleService.processLog(logs)
    await this._processEvent(events)
    await this.syncHandleService.saveBlock(logs)
  }

  private async _processEvent(events) {
    for (const event of events) {
      console.log(`xxx event `, event.event)
      switch (event.event) {
        case 'ProjectCreated':
          await this._handleProjectCreated(event)
          break
        case 'SeedStageCreated':
          await this._handleSeedStageCreated(event)
          break
        case 'RoundCreated':
          await this._handleRoundCreated(event)
          break
        case 'TokenCreated':
          await this._handleTokenCreated(event)
          break
        case 'UserDeposited':
          await this._handleUserDeposited(event)
          break
        case 'UpdateDepositToken':
          await this._handleUpdateSeedStage(event)
          break
        case 'UpdateIouToken':
          await this._handleUpdateSeedStage(event)
          break
      }
    }
  }

  private async _handleProjectCreated(event) {
    await this.projectsService.createProject(event.data)
  }
  private async _handleUpdateSeedStage(event) {
    console.log(event)
    const seedStageAddress = event.address.toLowerCase()
    await this.seedstagesService.update(seedStageAddress, event.data)
    //TODO : set admin iou token for seedStageAddress
  }
  private async _handleSeedStageCreated(event) {
    const { seedStageAddress } = event.data
    await this.seedstagesService.createSeedstage(event.data)
    CONTRACT_SYNC.push(seedStageAddress)

    //TODO : set admin iou token for seedStageAddress
  }
  private async _handleRoundCreated(event) {
    const seedStageAddress = event.address
    await this.seedstageRoundsService.createStageRound({
      seedStageAddress,
      ...event.data
    })
  }
  private async _handleTokenCreated(event) {
    await this.iouTokensService.create(event.data)
  }
  private async _handleUserDeposited(event) {
    console.log(event)
    const seedStageAddress = event.address
    await this.depositHistorysService.create({
      seedStageAddress,
      ...event.data
    })
  }

  async verifyAddress(address: string) {
    try {
      const ethAddress = ethers.getAddress(address)

      return {
        responseStatus: ResponseStatus.SUCCEED,
        msg: 'Success',
        data: { ethAddress }
      }
    } catch (error) {
      return {
        responseStatus: ResponseStatus.FAILED,
        msg: error.message,
        data: {}
      }
    }
  }

  async generateSigningMessage(address: string, nonce: string) {
    return [
      `Welcome to rAsset`,
      `Signing this message is intented to authenticate your wallet to rAsset.io`,
      `Address: ${address}`,
      `Nonce: ${nonce}`
    ].join('\n')
  }

  async verifySignature(address: string, message: string, signature: string) {
    try {
      const recoveredAddress = ethers.verifyMessage(message, signature)
      const isVerified =
        ethers.getAddress(recoveredAddress) == ethers.getAddress(address)

      return {
        responseStatus: ResponseStatus.SUCCEED,
        msg: 'Success',
        data: { isVerified }
      }
    } catch (error) {
      return {
        responseStatus: ResponseStatus.FAILED,
        msg: error.message,
        data: {}
      }
    }
  }

  async getEtherProvier() {
    const RPC_URL = process.env.POLYGON_PROVIDER
    return new ethers.JsonRpcProvider(RPC_URL)
  }

  async getErc20Contract(address: string) {
    const provider = await this.getEtherProvier()
    return Erc20__factory.connect(address, provider)
  }

  async getUserBalance(userAddress: string) {
    const boxTokenContractAddress = '0x979d46D13249Eba8E008b9395D9daF457Ad68FED'
    const erc20Contract = await this.getErc20Contract(boxTokenContractAddress)
    const userBalance = await erc20Contract.balanceOf(userAddress)
    console.log('Balance:', new BigNumber(userBalance.toString()).toFormat())
  }
}
