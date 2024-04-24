import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BackerSchema } from './backer.schema'
import { BackerService } from './backer.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Backer', schema: BackerSchema }])
  ],
  providers: [BackerService],
  exports: [BackerService],
  controllers: []
})
export class BackerModule {}
