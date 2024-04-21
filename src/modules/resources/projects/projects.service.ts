import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateProjectDto, GetProjectsDto } from './dto/request.dto'
import { pick } from 'lodash'
import { Project } from './projects.interface'
import { CreateProjectDto } from '@/modules/aggregators/admin-cms/dto/request.dto'

@Injectable()
export class ProjectsService {
  constructor(@InjectModel('Project') private projectModel: Model<Project>) {}

  async getProjectById(projectId: string) {
    return this.projectModel.findOne({ projectId })
  }

  async getProjectBySudomain(subdomain: string) {
    return this.projectModel.findOne({ subdomain })
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
        { projectName: { $regex: getProjectsDto.search, $options: 'i' } }
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

    const [lists, total] = await Promise.all([
      this.projectModel.find(queries, null, options),
      this.projectModel.countDocuments(queries)
    ])

    return {
      total,
      offset,
      limit,
      data: lists
    }
  }

  async createProject(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(
      pick(createProjectDto, 'projectId', 'projectName', 'projectCode')
    )
  }

  async updateProject(projectId: string, updateDto: UpdateProjectDto) {
    return this.projectModel.findOneAndUpdate(
      {
        projectId
      },
      pick(
        updateDto,
        'subdomain',
        'shortDescription',
        'fullDescription',
        'website',
        'telegram',
        'twitter',
        'discord',
        'logo',
        'banner'
      ),
      {
        new: true
      }
    )
  }
  async delete(projectId) {
    return this.projectModel.findOneAndUpdate(
      {
        projectId
      },
      { isDeleted: true },
      {
        new: true
      }
    )
  }
}
