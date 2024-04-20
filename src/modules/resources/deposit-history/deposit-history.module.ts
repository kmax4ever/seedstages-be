import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { DepositHistorySchema } from './deposit-history.schema'
import { DepositHistorysService } from './deposit-history.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DepositHistory', schema: DepositHistorySchema }
    ])
  ],
  providers: [DepositHistorysService],
  exports: [DepositHistorysService],
  controllers: []
})
export class DepositHistoryModule {}
