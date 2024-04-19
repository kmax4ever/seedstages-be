import { Injectable, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Web3 from 'web3'
import { ABIS, EVENTS } from '@/config/constanst'
import { SyncStatusService } from '@/modules/resources/sync-status/sync-status.service'

@Injectable()
export class SyncHandleService implements OnModuleInit {
  private web3Default: any
  private mapTopicsAbi = {}
  private abis: any
  private delayBlock = Number(process.env.DELAY_BLOCK || 5)
  constructor(
    private readonly configService: ConfigService,
    private readonly syncStatusService: SyncStatusService
  ) {}

  async onModuleInit() {
    this.web3Default = new Web3(this.configService.get('POLYGON_PROVIDER'))
    this.abis = ABIS // list abis
    this.initTopicAbi()
  }

  async initTopicAbi() {
    for (const i of this.abis) {
      if (i.type == 'event') {
        const signature = this.web3Default.eth.abi.encodeEventSignature(i)
        // if (EVENTS[signature.toLowerCase()]) {
        this.mapTopicsAbi[signature] = i
        //}
      }
    }
    console.log(this.mapTopicsAbi)
  }

  async getLogs(from: number, to: number, address: [], topics = []) {
    const logs = await this.web3Default.eth.getPastLogs({
      address: address,
      topics,
      fromBlock: from,
      toBlock: to
    })
    return logs
  }

  processLog(logs = []) {
    const events = []
    for (const log of logs) {
      const event = this.decodeLog(log)
      if (event) {
        events.push(event)
      }
    }
    return events
  }

  decodeLog(log: any) {
    try {
      const signature = log.topics[0]
      const eventAbi = this.mapTopicsAbi[signature]
      if (!eventAbi) {
        return
      } else {
        const { inputs, anonymous, name } = eventAbi
        if (!anonymous) {
          log.topics.splice(0, 1)
        }
        const decodeData = this.web3Default.eth.abi.decodeLog(
          inputs,
          log.data,
          log.topics
        )
        const address = log.address
        const blockHash = log.blockHash
        const blockNumber = log.blockNumber
        const event = name
        const data = decodeData
        const transactionHash = log.transactionHash
        const transactionIndex = log.transactionIndex

        return {
          address,
          blockHash,
          blockNumber,
          event,
          data,
          transactionHash,
          transactionIndex
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getlastestBlock() {
    const lastBlock = await this.web3Default.eth.getBlockNumber()
    return lastBlock
  }

  async saveBlock(logs: any) {
    for (const log of logs) {
      const savedBlocks: any = {}
      const { blockNumber, blockHash } = log
      if (savedBlocks[blockNumber]) {
        return
      }
      savedBlocks[blockNumber] = true

      const block = await this.syncStatusService.getBlock(blockNumber)
      if (block && block.blockNumber) {
        return
      }
      await this.syncStatusService.saveBlock(blockNumber, blockHash)
    }
  }
}
