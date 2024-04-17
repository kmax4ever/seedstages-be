import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateProjectDto, GetProjectsDto } from './dto/request.dto'
import { pick } from 'lodash'
import { Project } from './projects.interface'

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async getProjectById(projectId: string) {
    return this.projectModel.findById(projectId)
  }

  async getProjects(getProjectsDto: GetProjectsDto) {
    const offset = getProjectsDto.offset || 0
    const limit = getProjectsDto.limit || 10

    const options = {
      skip: offset,
      limit,
      sort: {
        createdAt: -1
      }
    }

    const queries = {}

    let searches = []
    if (getProjectsDto.search) {
      searches = [
        { assetName: { $regex: getProjectsDto.search, $options: 'i' } }
      ]
    }

    const filters = []

    // if (getProjectsDto.assetType) {
    //   filters.push({ assetType: { $eq: getProjectsDto.assetType } })
    // }

    if (searches.length > 0) {
      queries['$or'] = searches
    }

    if (filters.length > 0) {
      queries['$and'] = filters
    }

    const assets = await this.projectModel
      .find(queries, null, options)
      .populate('assetType')
    const total = await this.projectModel.countDocuments(queries)

    return {
      total,
      offset,
      limit,
      data: assets
    }
  }

  async createProject(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(
      pick(
        createProjectDto,
        'name',
        'slug',
        'shortDescription',
        'fullDescription',
        'website',
        'telegram',
        'twitter',
        'discord',
        'logo',
        'banner'
      )
    )
  }
}
