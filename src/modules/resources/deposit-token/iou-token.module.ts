import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IouTokenSchema } from './iou-token.schema'
import { IouTokensService } from './iou-token.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'IouToken', schema: IouTokenSchema }])
  ],
  providers: [IouTokensService],
  exports: [IouTokensService],
  controllers: []
})
export class IouTokensModule {}
