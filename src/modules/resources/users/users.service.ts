import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './user.interface'
import bcrypt from 'bcrypt'
import { CreateUserDto, UpdateUserDto } from './dto/user-request.dto'
import { omit } from 'lodash'
import { RoleService } from '../roles/role.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private roleService: RoleService
  ) {}

  async findById(userId: string): Promise<any> {
    return this.userModel.findById(userId).select('-password').populate({
      path: 'role',
      select: '_id key'
    })
  }

  async getUserDetail(userId: string) {
    const user = await this.userModel
      .findOne({ _id: userId })
      .populate({
        path: 'role',
        select: '_id key'
      })
      .select('-password')

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    return user
  }

  async comparePassword(plainPass: string, password: string): Promise<boolean> {
    return bcrypt.compare(plainPass, password)
  }

  async attempt(username: string, password: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ username }).populate({
      path: 'role',
      select: '_id key'
    })

    if (!user)
      throw new HttpException('User does not exist.', HttpStatus.NOT_FOUND)

    if (user) {
      const matchPassword = await this.comparePassword(password, user.password)

      if (!matchPassword) {
        throw new HttpException('Password is incorrect', HttpStatus.BAD_REQUEST)
      }
      return user
    }

    return null
  }

  async createUser(userData: CreateUserDto) {
    try {
      const usernameExist = await this.userModel.findOne({
        username: userData.username
      })

      if (usernameExist) {
        throw new HttpException('Username already exist.', HttpStatus.CONFLICT)
      }

      const salt = await bcrypt.genSalt(10)

      const newUserData = omit(userData, 'password', 'role')

      // const role = await this.roleService.findById(userData.role)
      // if (role) {
      //   newUserData['role'] = role.id

      newUserData['password'] = await bcrypt.hash(userData.password, salt)

      return await this.userModel.create(newUserData)
      // }
    } catch (error) {
      throw error
    }
  }

  async updateUser(userId: string, updateUserData: UpdateUserDto) {
    const user = await this.userModel.findOne({ _id: userId })
    if (!user) throw new HttpException('User not found.', HttpStatus.NOT_FOUND)

    if (updateUserData.password) {
      const salt = await bcrypt.genSalt(10)

      updateUserData['password'] = await bcrypt.hash(
        updateUserData.password,
        salt
      )
    }

    return await this.userModel.findByIdAndUpdate(userId, updateUserData, {
      new: true
    })
  }

  async getProfile(userId: string) {
    try {
      const profile = await this.userModel
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
}
