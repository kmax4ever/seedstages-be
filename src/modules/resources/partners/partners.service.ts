import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  GetOwnerQueriesDto,
  UpdateOwnerDto,
  UpdateOwnerKycDto
} from './dto/owner-request.dto'
import { pick } from 'lodash'
import { Partner } from './partners.interface'

@Injectable()
export class PartnersService {
  constructor(@InjectModel('Partner') private partnerModel: Model<Partner>) {}

  async getPartners(getPartnersDto: GetOwnerQueriesDto) {
    const offset = getPartnersDto.offset || 0
    const limit = getPartnersDto.limit || 10

    const options = {
      skip: offset,
      limit,
      sort: {
        createdAt: -1
      }
    }

    const queries = {}

    let searches = []
    if (getPartnersDto.search) {
      searches = [
        { username: { $regex: getPartnersDto.search, $options: 'i' } }
      ]
    }

    if (searches.length > 0) {
      queries['$or'] = searches
    }

    const partners = await this.partnerModel.find(queries, null, options)
    const total = await this.partnerModel.countDocuments(queries)

    return {
      total,
      offset,
      limit,
      data: partners
    }
  }

  async getPartnerById(userId: string): Promise<any> {
    return this.partnerModel.findById(userId).select('-password')
  }

  async getPartnerByWalletAddress(walletAddress: string) {
    return this.partnerModel.findOne({
      walletAddress: walletAddress
    })
  }

  async getProfile(userId: string) {
    try {
      const profile = await this.partnerModel
        .findById(userId)
        .select('-password')
        .populate({
          path: 'role',
          select: '_id key title',
          populate: {
            path: 'permissions',
            select: '_id key'
          }
        })
        .lean()

      return profile
    } catch (e) {
      console.log('error', e)
    }

    return null
  }

  async getOrCreateOwner(walletAddress: string, role: string) {
    try {
      const existedUser = await this.partnerModel.findOne({
        walletAddress
      })

      if (existedUser) {
        return existedUser
      }
      return this.partnerModel.create({
        walletAddress,
        role,
        username: walletAddress
      })
    } catch (error) {
      throw error
    }
  }

  async updateOwner(ownerId: string, updateOwnerDto: UpdateOwnerDto) {
    return this.partnerModel.findByIdAndUpdate(ownerId, updateOwnerDto, {
      new: true
    })
  }

  async updateKycOwner(ownerId: string, updateOwnerKycDto: UpdateOwnerKycDto) {
    return this.partnerModel.findByIdAndUpdate(
      ownerId,
      pick(
        updateOwnerKycDto,
        'firstName',
        'lastName',
        'email',
        'isEmailVerified',
        'phoneNumber',
        'isPhoneNumberVerified',
        'dateOfBirth',
        'twitter',
        'isTwitterVerified',
        'telegram',
        'isTelegramVerified'
      ),
      {
        new: true
      }
    )
  }
}
