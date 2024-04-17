import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SettingSchema } from './setting.schema'
import { SettingsAdminService } from './settings-admin.service'
import { SettingsExternalService } from './settings-external.service'
import { SettingsInternalService } from './settings-internal.service'
import { SettingsSystemService } from './settings-system.service'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }])
  ],
  providers: [
    SettingsAdminService,
    SettingsSystemService,
    SettingsExternalService,
    SettingsInternalService
  ],
  exports: [
    SettingsAdminService,
    SettingsSystemService,
    SettingsExternalService,
    SettingsInternalService
  ],
  controllers: []
})
export class SettingsModule {}
