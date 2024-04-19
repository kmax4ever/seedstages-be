import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { pick } from 'lodash'
import { SeedstageRound } from './seedstage-round.interface'
import { CreateStageRoundDto } from '@/modules/aggregators/admin-cms/dto/request.dto'

@Injectable()
export class SeedstageRoundsService {
  constructor(
    @InjectModel('SeedstageRound')
    private seedstageRoundModel: Model<SeedstageRound>
  ) {}

  async getStageRoundByStageId(stageId: string) {
    return this.seedstageRoundModel.find({ seedstage: stageId })
  }

  async createStageRound(createStageRoundDto: CreateStageRoundDto) {
    return this.seedstageRoundModel.create(
      pick(
        createStageRoundDto,
        'seedStageAddress',
        'roundId',
        'isWhitelistRound',
        'allocation',
        'minAllocationPerAddress',
        'maxAllocationPerAddress',
        'startTime',
        'endTime',
        'raisedAmount',
        'merkleRoot'
      )
    )
  }
}
