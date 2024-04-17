import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateSettingsDto } from './dto/admin-request.dto'
import { Setting } from './setting.interface'

@Injectable()
export class SettingsAdminService {
  constructor(@InjectModel('Setting') private settingModel: Model<Setting>) {}

  async getSettings() {
    return this.settingModel.findOne()
  }

  async updateSettings(updateSettingsDto: UpdateSettingsDto) {
    const settings = await this.settingModel.findOne()
    if (!settings) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
    }
    return await this.settingModel.findOneAndUpdate(
      {
        _id: settings.id
      },
      updateSettingsDto,
      { new: true }
    )
  }
}
