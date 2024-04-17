import { Injectable } from '@nestjs/common'
import { Interval, SchedulerRegistry } from '@nestjs/schedule'

@Injectable()
export class TasksService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  deleteInterval(name: string) {
    this.schedulerRegistry.deleteInterval(name)
    console.log(`Interval ${name} deleted!`)
  }

  deleteAllInterval() {
    const intervals = this.schedulerRegistry.getIntervals()
    intervals.forEach((interval) => {
      this.deleteInterval(interval)
    })
  }
}
