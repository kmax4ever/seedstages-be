import { Logger } from '@nestjs/common'

export class CustomLogger extends Logger {
  constructor() {
    super()
  }

  error(message: any, trace: any = null) {
    super.error(message, trace)

    try {
      console.log(message + ' - ' + trace)
    } catch (e) {}
  }

  debug(message: any, context?: string) {
    super.debug(message, context)
    try {
      console.log(message)
    } catch (e) {}
  }
}
