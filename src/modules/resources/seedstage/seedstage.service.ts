import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  CreateSeedstageDto,
  GetStagesDto,
  UpdateSeedStageDto
} from './dto/request.dto'
import { pick } from 'lodash'
import { Seedstage } from './seedstage.interface'

@Injectable()
export class SeedstagesService {
  constructor(
    @InjectModel('Seedstage') private seedstageModel: Model<Seedstage>
  ) {}

  async getStageById(stageId: string) {
    return this.seedstageModel
      .findById(stageId)
      .populate('project')
      .populate('iouToken')
      .lean()
  }

  async getStageBySlug(stageSlug: string) {
    return this.seedstageModel
      .findOne({ slug: stageSlug })
      .populate('project')
      .populate('iouToken')
      .lean()
  }
  async getStages(getStagesDto: GetStagesDto) {
    const offset = getStagesDto.offset || 0
    const limit = getStagesDto.limit || 10

    const options = {
      skip: offset,
      limit,
      sort: {
        createdAt: -1
      }
    }

    const queries = {}

    let searches = []
    if (getStagesDto.search) {
      searches = [{ name: { $regex: getStagesDto.search, $options: 'i' } }]
    }

    const filters = []

    if (getStagesDto.status) {
      filters.push({ status: { $eq: getStagesDto.status } })
    }

    if (searches.length > 0) {
      queries['$or'] = searches
    }

    if (filters.length > 0) {
      queries['$and'] = filters
    }

    const assets = await this.seedstageModel
      .find(queries, null, options)
      .populate('project')
      .populate('iouToken')
    const total = await this.seedstageModel.countDocuments(queries)

    return {
      total,
      offset,
      limit,
      data: assets
    }
  }

  async createSeedstage(createSeedstageDto: CreateSeedstageDto) {
    return this.seedstageModel.create(
      pick(
        createSeedstageDto,
        'projectId',
        'iouToken',
        'depositToken',
        'seedStageAddress',
        'multiSigAddress'
      )
    )
  }

  async getSeedStageAddres() {
    const seedstages = await this.seedstageModel.find()
    return seedstages.map((i) => i.seedStageAddress)
  }

  async udpate(address: string, updateDto: UpdateSeedStageDto) {
    return this.seedstageModel.findOneAndUpdate(
      { address },
      pick(updateDto, 'name', 'status')
    )
  }
}
