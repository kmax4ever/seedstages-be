import { ResponseStatus } from '@/modules/common/const/general'
import {
  Erc20__factory,
  ReDAOIOUTokenFactory__factory,
  ReDAOSeedStageFactory__factory,
  ReDAOSeedStage__factory,
  Erc721__factory
} from '@/types'
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
import { SyncStatusService } from '@/modules/resources/sync-status/sync-status.service'
import { SyncHandleService } from './syncHandle.service'
import { waitMs } from '@/utils/helper'
import { CONTRACT_NEED_SYNC, ZERO_ADDRESS } from '@/config/constanst'
import SeedStageFactory from '../../../abis/ReDAOSeedStageFactory.json'
import { CreateSeedstageDto } from '@/modules/resources/seedstage/dto/request.dto'
import { CreateTokenDto } from '@/modules/resources/deposit-token/dto/request.dto'
import {
  CmsCreateIouTokenDto,
  CmsCreateStageRoundDto,
  CreateStageRoundDto
} from '@/modules/aggregators/admin-cms/dto/request.dto'
require('dotenv').config()
@Injectable()
export class EthersService {
  private lastBlockSynced: number
  private incrementBlock = Number(process.env.INCREMENT_BLOCK || 20)
  private inititalBlockNum = Number(process.env.INIT_BLOCK_SYNC || 1000000)
  private delayBlock = Number(process.env.DELAY_BLOCK || 5)
  private version = Number(process.env.VERSION || 1)
  public provider: any
  constructor(
    private readonly configService: ConfigService,
    private readonly syncStatusService: SyncStatusService,
    private readonly syncHandleService: SyncHandleService
  ) {
    this.provider = this.getEtherProvier()
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

  getEtherProvier() {
    const RPC_URL = process.env.RPC_ENDPOINT
    return new ethers.JsonRpcProvider(RPC_URL)
  }

  async getErc20Contract(address: string) {
    const provider = this.getEtherProvier()
    return Erc20__factory.connect(address, provider)
  }

  async getUserBalance(userAddress: string) {
    const boxTokenContractAddress = '0x979d46D13249Eba8E008b9395D9daF457Ad68FED'
    const erc20Contract = await this.getErc20Contract(boxTokenContractAddress)
    const userBalance = await erc20Contract.balanceOf(userAddress)
    console.log('Balance:', new BigNumber(userBalance.toString()).toFormat())
  }

  public getRedaoSeedStageFactory() {
    //return ReDAOSeedStageFactory__factory.connect(address, provider)
    return new ethers.Contract(
      process.env.SEEDSTAGE_FACTORY_CONTRACT as string,
      SeedStageFactory
    ).connect(this.provider)
  }

  public getTokenFactory() {
    // return new ethers.Contract(
    //   process.env.TOKEN_FACTORY_CONTRACT as string,
    //   SeedStageFactory
    // ).connect(this.provider)

    return ReDAOIOUTokenFactory__factory.connect(
      process.env.TOKEN_FACTORY_CONTRACT as string,
      this.provider
    )
  }

  public getSeedStageContract(seedstageAddress: string) {
    return ReDAOSeedStage__factory.connect(seedstageAddress, this.provider)
  }

  //TODO // remove when have cms fe
  async createProject(projectName: string, projectCode: string) {
    const params = [projectName, projectCode]
    const to = process.env.SEEDSTAGE_FACTORY_CONTRACT
    const seedStageFactory = this.getRedaoSeedStageFactory()
    const fucName = 'createProject'
    return await this._sendTx(params, fucName, seedStageFactory, to)
  }

  //TODO //remove when have cms fe
  async createSeedStage(createSeedStage: CreateSeedstageDto) {
    const params = [
      +createSeedStage.projectId,
      createSeedStage.multiSigAddress,
      createSeedStage.iouToken,
      createSeedStage.depositToken
    ]
    const to = process.env.SEEDSTAGE_FACTORY_CONTRACT
    const seedStageFactory = this.getRedaoSeedStageFactory()
    const fucName = 'createReDAOSeedStage'
    return await this._sendTx(params, fucName, seedStageFactory, to)
  }

  //TODO // remove when have cms fe
  async createIouToken(createTokenDto: CmsCreateIouTokenDto) {
    const params = [
      createTokenDto.projectId,
      createTokenDto.name,
      createTokenDto.symbol
    ]
    const to = process.env.TOKEN_FACTORY_CONTRACT
    const seedStageFactory = this.getTokenFactory()
    const fucName = 'createReDAOIOUToken'
    return await this._sendTx(params, fucName, seedStageFactory, to)
  }

  async createRound(createRound: CmsCreateStageRoundDto) {
    const params = [
      createRound.isWhitelistRound,
      createRound.allocation,
      createRound.minAllocationPerAddress,
      createRound.maxAllocationPerAddress,
      +createRound.startTime,
      +createRound.endTime,
      createRound.merkleRoot
    ]
    const to = createRound.seedStageAddress
    const seedStageFactory = this.getSeedStageContract(
      createRound.seedStageAddress
    )
    const fucName = 'setRoundDetails'
    return await this._sendTx(params, fucName, seedStageFactory, to)
  }

  private async _sendTx(params, fucName, contract, to) {
    try {
      const wallet = new ethers.Wallet(process.env.PKEY as string).connect(
        this.provider
      )
      // await contract.callStatic.createProject(...params, {
      //   from: wallet.address
      // })

      const dataObj = contract.interface.encodeFunctionData(fucName, params)
      const tx = {
        chainId: +process.env.CHAIN_ID,
        from: wallet.address,
        to,
        data: dataObj
      } as any
      const [feeData, gasLimit] = await Promise.all([
        this.provider.getFeeData(),
        this.provider.estimateGas(tx)
      ])

      tx['gasLimit'] = gasLimit
      tx['gasPrice'] = feeData.gasPrice

      const txn = await wallet.sendTransaction(tx)
      await txn.wait()
      console.info(`... Sent! ${txn.hash}`)
      return txn.hash
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
