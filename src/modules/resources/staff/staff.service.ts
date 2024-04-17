import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  GetOwnerQueriesDto,
  UpdateOwnerDto,
  UpdateOwnerKycDto
} from './dto/owner-request.dto'
import { pick } from 'lodash'
import { Staff } from './staff.interface'

@Injectable()
export class StaffsService {
  constructor(@InjectModel('Staff') private staffModel: Model<Staff>) {}

  async getStaffs(getStaffsDto: GetOwnerQueriesDto) {
    const offset = getStaffsDto.offset || 0
    const limit = getStaffsDto.limit || 10

    const options = {
      skip: offset,
      limit,
      sort: {
        createdAt: -1
      }
    }

    const queries = {}

    let searches = []
    if (getStaffsDto.search) {
      searches = [{ username: { $regex: getStaffsDto.search, $options: 'i' } }]
    }

    if (searches.length > 0) {
      queries['$or'] = searches
    }

    const Staffs = await this.staffModel.find(queries, null, options)
    const total = await this.staffModel.countDocuments(queries)

    return {
      total,
      offset,
      limit,
      data: Staffs
    }
  }

  async getStaffById(userId: string): Promise<any> {
    return this.staffModel.findById(userId).select('-password')
  }

  async getStaffByWalletAddress(walletAddress: string) {
    return this.staffModel.findOne({
      walletAddress: walletAddress
    })
  }

  async getProfile(userId: string) {
    try {
      const profile = await this.staffModel
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
      const existedUser = await this.staffModel.findOne({
        walletAddress
      })

      if (existedUser) {
        return existedUser
      }
      return this.staffModel.create({
        walletAddress,
        role,
        username: walletAddress
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateOwner(ownerId: string, updateOwnerDto: UpdateOwnerDto) {
    return this.staffModel.findByIdAndUpdate(ownerId, updateOwnerDto, {
      new: true
    })
  }

  async updateKycOwner(ownerId: string, updateOwnerKycDto: UpdateOwnerKycDto) {
    return this.staffModel.findByIdAndUpdate(
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
