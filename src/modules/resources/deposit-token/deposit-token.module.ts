import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IouTokenSchema } from './deposit-token.schema'
import { IouTokensService } from './deposit-token.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DepositToken', schema: IouTokenSchema }
    ])
  ],
  providers: [IouTokensService],
  exports: [IouTokensService],
  controllers: []
})
export class DepositToken {}
