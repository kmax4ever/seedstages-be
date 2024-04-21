import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { pick } from 'lodash'
import { SeedstageRound } from './seedstage-round.interface'
import {
  CmsUpdateRound,
  CreateStageRoundDto
} from '@/modules/aggregators/admin-cms/dto/request.dto'

@Injectable()
export class SeedstageRoundsService {
  constructor(
    @InjectModel('SeedstageRound')
    private seedstageRoundModel: Model<SeedstageRound>
  ) {}

  async getRoundById(seedStageAddress: string, roundId: string) {
    return this.seedstageRoundModel.findOne({ seedStageAddress, roundId })
  }

  async getRounds(seedStageAddress: string) {
    return this.seedstageRoundModel.find({ seedStageAddress })
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

  async updateRound(
    seedStageAddress: string,
    roundId: string,
    createStageRoundDto: CmsUpdateRound
  ) {
    return this.seedstageRoundModel.findOneAndUpdate(
      {
        seedStageAddress,
        roundId
      },
      pick(createStageRoundDto, `name`, 'roundType'),
      {
        new: true
      }
    )
  }
}
