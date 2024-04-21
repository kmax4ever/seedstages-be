import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IouTokenSchema } from './deposit-token.schema'
import { DepositTokensService } from './deposit-token.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DepositToken', schema: IouTokenSchema }
    ])
  ],
  providers: [DepositTokensService],
  exports: [DepositTokensService],
  controllers: []
})
export class DepositToken {}
