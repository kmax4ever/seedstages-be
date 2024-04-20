import { Module } from '@nestjs/common'
import { EthersService } from './ethers.service'
import { SyncStatusModule } from '@/modules/resources/sync-status/sync-status.module'
import { SyncHandleService } from './syncHandle.service'
import { ProjectsModule } from '@/modules/resources/projects/projects.module'
import { IouTokensModule } from '@/modules/resources/iou-token/iou-token.module'
import { SeedstageRoundModule } from '@/modules/resources/seedstage-round/seedstage-round.module'
import { SeedstagesModule } from '@/modules/resources/seedstage/seedstage.module'
import { DepositHistoryModule } from '@/modules/resources/deposit-history/deposit-history.module'

@Module({
  imports: [
    SyncStatusModule,
    ProjectsModule,
    IouTokensModule,
    SeedstageRoundModule,
    SeedstagesModule,
    DepositHistoryModule
  ],
  providers: [EthersService, SyncHandleService],
  exports: [EthersService],
  controllers: []
})
export class EthersModule {}
