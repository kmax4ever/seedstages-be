import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Setting } from './setting.interface'

@Injectable()
export class SettingsExternalService {
  constructor(@InjectModel('Setting') private settingModel: Model<Setting>) {}

  async getSettings() {
    return this.settingModel.findOne()
  }
}
