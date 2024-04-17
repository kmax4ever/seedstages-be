import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersService } from './users.service'
import { AuthModule } from '@/modules/shared/auth/auth.module'
import { UserSchema } from './user.schema'
import { RoleModule } from '../roles/role.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema, collection: 'users' }
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => RoleModule)
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: []
})
export class UsersModule {}
