import { loadConfig } from '@/config'
import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { ExternalsModule } from './modules/aggregators/externals/externals.module'

import { CmsAdminModule } from './modules/aggregators/admin-cms/admin-cms.module'
import { EthersModule } from './modules/adapters/ethers/ethers.module'

@Module({
  imports: [
    loadConfig(),
    DatabaseModule,
    ExternalsModule,
    CmsAdminModule,
    TasksModule,
    EthersModule
  ]
})
export class AppModule {}
