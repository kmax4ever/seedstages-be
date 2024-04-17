import { Global, Module } from '@nestjs/common'
import { CustomLogger } from '../common/logger/custom-logger'

@Global()
@Module({
  providers: [CustomLogger],
  exports: [CustomLogger]
})
export class SharedModule {}
