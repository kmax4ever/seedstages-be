import { Module } from '@nestjs/common'
import { AuthModule } from '@/modules/shared/auth/auth.module'
import { UsersModule } from '@/modules/resources/users/users.module'

import { AdminCmsService } from './admin-cms.service'
import { AdminCmsController } from './admin-cms.controller'
import { PartnerModule } from '@/modules/resources/partners/partners.module'
import { ProjectsModule } from '@/modules/resources/projects/projects.module'
import { IouTokensModule } from '@/modules/resources/iou-token/iou-token.module'
import { SeedstagesModule } from '@/modules/resources/seedstage/seedstage.module'
import { SeedstageRoundModule } from '@/modules/resources/seedstage-round/seedstage-round.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PartnerModule,
    ProjectsModule,
    IouTokensModule,
    SeedstagesModule,
    SeedstageRoundModule
  ],
  providers: [AdminCmsService],
  controllers: [AdminCmsController]
})
export class CmsAdminModule {}
