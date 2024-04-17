import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { StaffSchema } from './staff.schema'
import { StaffsService } from './staff.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Staff', schema: StaffSchema }])
  ],
  providers: [StaffsService],
  exports: [StaffsService],
  controllers: []
})
export class StaffModule {}
