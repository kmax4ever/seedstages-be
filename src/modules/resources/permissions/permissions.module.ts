import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { PermissionSchema } from './permissions.schema'
import { PermissionService } from './permissions.service'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Permission',
        schema: PermissionSchema,
        collection: 'permissions'
      }
    ])
  ],
  controllers: [],
  providers: [PermissionService],
  exports: [PermissionService]
})
export class PermissionModule {}
