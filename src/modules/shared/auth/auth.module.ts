import { Global, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LocalStrategy } from '@/modules/common/strategies/local.strategy'
import { UsersModule } from '@/modules/resources/users/users.module'
import { JwtUserStrategy } from '@/modules/common/strategies/jwt-user.strategy'
import { JwtPartnerStrategy } from '@/modules/common/strategies/jwt-partner.strategy'
import { PartnerModule } from '@/modules/resources/partners/partners.module'

@Global()
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: `${configService.get('JWT_TTL')}s` }
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    PartnerModule,
    PassportModule
  ],
  providers: [AuthService, LocalStrategy, JwtPartnerStrategy, JwtUserStrategy],
  exports: [AuthService]
})
export class AuthModule {}
