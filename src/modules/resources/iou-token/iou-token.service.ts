import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTokenDto, UpdateIOUTokenDto } from './dto/request.dto'
import { pick } from 'lodash'
import { IouToken } from './iou-token.interface'

@Injectable()
export class IouTokensService {
  constructor(
    @InjectModel('IouToken') private iouTokenModel: Model<IouToken>
  ) {}

  async getIouToken(tokenAddress: string) {
    return this.iouTokenModel.findOne({ tokenAddress })
  }

  async getList(projectId: string) {
    return this.iouTokenModel.find({ projectId })
  }

  async updateIouToken(tokenAddress: string, updateDto: UpdateIOUTokenDto) {
    return this.iouTokenModel.findOneAndUpdate(
      {
        tokenAddress
      },
      pick(updateDto, 'logo', 'description'),
      {
        new: true
      }
    )
  }

  async create(createDto: CreateTokenDto) {
    return this.iouTokenModel.create(
      pick(createDto, 'projectId', 'name', 'symbol', 'tokenAddress', 'owner')
    )
  }
}
