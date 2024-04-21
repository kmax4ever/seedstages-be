import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateDepositTokenDto, UpdateDepositTokenDto } from './dto/request.dto'
import { pick } from 'lodash'
import { DepositToken } from './deposit-token.interface'

@Injectable()
export class DepositTokensService {
  constructor(
    @InjectModel('DepositToken') private depositTokenModel: Model<DepositToken>
  ) {}

  async getList() {
    return this.depositTokenModel.find()
  }

  async getByAddress(tokenAddress: string) {
    return this.depositTokenModel.findOne({ tokenAddress })
  }

  async update(tokenAddress: string, updateDto: UpdateDepositTokenDto) {
    return this.depositTokenModel.findOneAndUpdate(
      {
        tokenAddress
      },
      pick(updateDto, 'logo', 'description'),
      {
        new: true
      }
    )
  }

  async create(createDto: CreateDepositTokenDto) {
    return this.depositTokenModel.findOneAndUpdate(
      {
        tokenAddress: createDto.tokenAddress
      },
      pick(
        createDto,
        'tokenAddress',
        'name',
        'symbol',
        'decimals',
        'logo',
        'description'
      ),
      { upsert: true }
    )
  }
}
