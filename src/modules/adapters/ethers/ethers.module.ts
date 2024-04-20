import { Module } from '@nestjs/common'
import { SyncService } from './sync.service'
import { SyncStatusModule } from '@/modules/resources/sync-status/sync-status.module'
import { SyncHandleService } from './syncHandle.service'
import { ProjectsModule } from '@/modules/resources/projects/projects.module'
import { IouTokensModule } from '@/modules/resources/iou-token/iou-token.module'
import { SeedstageRoundModule } from '@/modules/resources/seedstage-round/seedstage-round.module'
import { SeedstagesModule } from '@/modules/resources/seedstage/seedstage.module'
import { DepositHistoryModule } from '@/modules/resources/deposit-history/deposit-history.module'
import { EthersService } from './ethers.service'

@Module({
  imports: [
    SyncStatusModule,
    ProjectsModule,
    IouTokensModule,
    SeedstageRoundModule,
    SeedstagesModule,
    DepositHistoryModule
  ],
  providers: [SyncService, SyncHandleService, EthersService],
  exports: [SyncService, EthersService],
  controllers: []
})
export class EthersModule {}
