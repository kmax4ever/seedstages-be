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
import { DepositToken } from '@/modules/resources/deposit-token/deposit-token.module'
import { EthersModule } from '@/modules/adapters/ethers/ethers.module'
import { DepositHistoryModule } from '@/modules/resources/deposit-history/deposit-history.module'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PartnerModule,
    ProjectsModule,
    IouTokensModule,
    SeedstagesModule,
    SeedstageRoundModule,
    DepositToken,
    EthersModule,
    DepositHistoryModule
  ],
  providers: [AdminCmsService],
  controllers: [AdminCmsController]
})
export class CmsAdminModule {}
