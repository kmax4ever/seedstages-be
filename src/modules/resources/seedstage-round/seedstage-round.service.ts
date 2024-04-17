import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateStageRoundDto } from './dto/request.dto'
import { pick } from 'lodash'
import { SeedstageRound } from './seedstage-round.interface'

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
        'seedstage',
        'name',
        'roundType',
        'allowcation',
        'minAllowcation',
        'maxAllowcation',
        'startTime',
        'endTime'
      )
    )
  }
}
