import { AuthModule } from '@/modules/shared/auth/auth.module'
import { RoleModule } from '@/modules/resources/roles/role.module'
import { Module } from '@nestjs/common'
import { PermissionModule } from '@/modules/resources/permissions/permissions.module'
import { ExternalsService } from './externals.service'
import { ExternalsController } from './externals.controller'
import { SeedstagesModule } from '@/modules/resources/seedstage/seedstage.module'
import { SeedstageRoundModule } from '@/modules/resources/seedstage-round/seedstage-round.module'
import { ProjectsModule } from '@/modules/resources/projects/projects.module'
import { DepositHistoryModule } from '@/modules/resources/deposit-history/deposit-history.module'

@Module({
  imports: [
    AuthModule,
    PermissionModule,
    RoleModule,
    SeedstagesModule,
    SeedstageRoundModule,
    ProjectsModule,
    DepositHistoryModule
  ],
  providers: [ExternalsService],
  controllers: [ExternalsController]
})
export class ExternalsModule {}
