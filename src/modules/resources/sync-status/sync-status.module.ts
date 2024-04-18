import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SyncStatusService } from './sync-status.service'
import { Block, SyncStatus } from './sync-status.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SyncStatus', schema: SyncStatus }]),
    MongooseModule.forFeature([{ name: 'Block', schema: Block }])
  ],
  providers: [SyncStatusService],
  exports: [SyncStatusService],
  controllers: []
})
export class SyncStatusModule {}
