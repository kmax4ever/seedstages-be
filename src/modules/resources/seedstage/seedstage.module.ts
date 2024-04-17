import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SeedstageSchema } from './seedstage.schema'
import { SeedstagesService } from './seedstage.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seedstage', schema: SeedstageSchema }])
  ],
  providers: [SeedstagesService],
  exports: [SeedstagesService],
  controllers: []
})
export class SeedstagesModule {}
