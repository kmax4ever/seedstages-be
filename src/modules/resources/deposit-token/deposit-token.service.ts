import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateTokenDto, UpdateTokenDto } from './dto/request.dto'
import { pick } from 'lodash'
import { DepositToken } from './deposit-token.interface'

@Injectable()
export class IouTokensService {
  constructor(
    @InjectModel('DepositToken') private depositTokenModel: Model<DepositToken>
  ) {}

  async getList() {
    return this.depositTokenModel.find()
  }

  async get(tokenAddress: string) {
    return this.depositTokenModel.findOne({ tokenAddress })
  }

  async update(tokenAddress: string, updateDto: UpdateTokenDto) {
    return this.depositTokenModel.findOneAndUpdate(
      {
        tokenAddress
      },
      pick(updateDto, 'logo', 'description')
    )
  }

  async create(createDto: CreateTokenDto) {
    return this.depositTokenModel.findOneAndUpdate(
      {
        tokenAddress: createDto.tokenAddress
      },
      pick(createDto, 'tokenAddress', 'name', 'symbol', 'decimals'),
      { upsert: true }
    )
  }
}
