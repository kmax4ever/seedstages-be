import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PartnerSchema } from './partners.schema'
import { PartnersService } from './partners.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partner', schema: PartnerSchema }])
  ],
  providers: [PartnersService],
  exports: [PartnersService],
  controllers: []
})
export class PartnerModule {}
