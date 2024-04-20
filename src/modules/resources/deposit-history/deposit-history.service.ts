import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { pick } from 'lodash'
import { DepositHistory } from './deposit-history.interface'
import { CreateUserDepositDto } from './dto/general.dto'

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
}
