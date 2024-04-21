import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { pick } from 'lodash'
import { DepositHistory } from './deposit-history.interface'
import { CreateUserDepositDto } from './dto/general.dto'
import { GetDepositHistoryDto } from './dto/request.dto'

@Injectable()
export class DepositHistorysService {
  constructor(
    @InjectModel('DepositHistory')
    private depositHistoryModel: Model<DepositHistory>
  ) {}
  async create(createDto: CreateUserDepositDto) {
    return this.depositHistoryModel.create(
      pick(createDto, 'seedStageAddress', 'roundId', 'user', 'amount')
    )
  }

  async getHistory(query: GetDepositHistoryDto) {
    const queries = {
      seedStageAddress: query.seedStageAddress,
      roundId: query.roundId
    }

    const offset = query.offset || 0
    const limit = query.limit || 10

    const options = {
      skip: offset,
      limit,
      sort: {
        createdAt: -1
      }
    }

    const [list, total] = await Promise.all([
      this.depositHistoryModel.find(queries, null, options),
      this.depositHistoryModel.countDocuments(queries)
    ])
    return {
      total,
      offset,
      limit,
      data: list
    }
  }
}
