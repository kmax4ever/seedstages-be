import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TasksService } from './tasks.service'

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TasksService]
})
export class TasksModule {}
