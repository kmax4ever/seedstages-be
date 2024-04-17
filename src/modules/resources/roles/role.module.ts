import { forwardRef, Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RoleService } from './role.service'
import { RoleSchema } from '@/modules/resources/roles/role.schema'
import { PermissionModule } from '../permissions/permissions.module'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Role', schema: RoleSchema, collection: 'roles' }
    ]),
    forwardRef(() => PermissionModule)
  ],
  controllers: [],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
