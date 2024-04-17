import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { SeedstageRoundSchema } from './seedstage-round.schema'
import { SeedstageRoundsService } from './seedstage-round.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SeedstageRound', schema: SeedstageRoundSchema }
    ])
  ],
  providers: [SeedstageRoundsService],
  exports: [SeedstageRoundsService],
  controllers: []
})
export class SeedstageRoundModule {}
