import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SyncStatus, Block } from './sync-status.interface'
import { pick } from 'lodash'
import { ConfigService } from '@nestjs/config'
@Injectable()
export class SyncStatusService {
  constructor(
    @InjectModel('SyncStatus') private syncStatusModel: Model<SyncStatus>,
    @InjectModel('Block') private blockModel: Model<Block>,
    private readonly configService: ConfigService
  ) {}

  async getSyncStatus() {
    return await this.syncStatusModel.findOne().lean()
  }

  async initData(initBlock: number) {
    console.log('init data')

    await this.syncStatusModel.create({
      version: +process.env.VERSION || 1,
      initBlock,
      lastBlockSynced: 0,
    })
  }

  async updateLastBlock(blockNumber: number, version: number) {
    await this.syncStatusModel.findOneAndUpdate(
      { version },
      { lastBlockSynced: blockNumber }
    )
  }

  async getBlock(blockNumber: number) {
    return await this.blockModel.findOne({ blockNumber })
  }

  async saveBlock(blockNumber: number, hash: string) {
    await this.blockModel.create({ blockNumber, hash })
  }

  async getBlocks(fromBlock: number, toBlock: number) {
    return await this.blockModel.find({
      blockNumber: { $gte: fromBlock, $lte: toBlock }
    })
  }
}
