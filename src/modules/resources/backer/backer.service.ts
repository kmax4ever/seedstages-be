import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { UpdateBackerDto, CreateBackerDto } from './dto/request.dto'
import { pick } from 'lodash'
import { Backer } from './backer.interface'

@Injectable()
export class BackerService {
  constructor(@InjectModel('Backer') private backerModel: Model<Backer>) {}

  async getByProjectId(projectId: string) {
    return this.backerModel.find({ projectId })
  }
  async getById(backerId: string) {
    console.log(new Types.ObjectId(backerId))
    return this.backerModel.findById(new Types.ObjectId(backerId))
  }

  async create(createDto: CreateBackerDto) {
    return this.backerModel.create(
      pick(
        createDto,
        'projectId',
        'name',
        'description',
        'website',
        'name',
        'logo'
      )
    )
  }
  async update(backerId, createDto: UpdateBackerDto) {
    return this.backerModel.findByIdAndUpdate(
      new Types.ObjectId(backerId),
      pick(createDto, 'name', 'description', 'website', 'name', 'logo'),
      { new: true }
    )
  }

  async delete(backerId) {
    return this.backerModel.findByIdAndDelete(new Types.ObjectId(backerId))
  }
}
