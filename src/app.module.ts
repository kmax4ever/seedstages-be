import { loadConfig } from '@/config'
import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { ExternalsModule } from './modules/aggregators/externals/externals.module'

import { CmsAdminModule } from './modules/aggregators/admin-cms/admin-cms.module'

@Module({
  imports: [
    loadConfig(),
    DatabaseModule,
    ExternalsModule,
    CmsAdminModule,
    TasksModule
  ]
})
export class AppModule {}
