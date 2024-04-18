import { Module } from '@nestjs/common'
import { EthersService } from './ethers.service'
import { SyncStatusModule } from '@/modules/resources/sync-status/sync-status.module'
import { SyncHandleService } from './syncHandle.service'

@Module({
  imports: [
    SyncStatusModule,
  ],
  providers: [EthersService, SyncHandleService],
  exports: [EthersService],
  controllers: []
})
export class EthersModule {}
