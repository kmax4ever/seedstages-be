import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateIouTokenDto } from './dto/request.dto'
import { pick } from 'lodash'
import { IouToken } from './iou-token.interface'

@Injectable()
export class IouTokensService {
  constructor(
    @InjectModel('IouToken') private iouTokenModel: Model<IouToken>
  ) {}

  async getIouTokenById(tokenId: string) {
    return this.iouTokenModel.findById(tokenId)
  }

  async createIouToken(createIouTokenDto: CreateIouTokenDto) {
    return this.iouTokenModel.create(
      pick(
        createIouTokenDto,
        'project',
        'name',
        'symbol',
        'tokenAddress',
        'logo',
        'ownerAddress',
        'description'
      )
    )
  }
}
