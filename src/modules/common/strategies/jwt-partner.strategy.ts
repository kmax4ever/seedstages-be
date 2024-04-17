import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PartnersService } from '@/modules/resources/partners/partners.service'

@Injectable()
export class JwtPartnerStrategy extends PassportStrategy(
  Strategy,
  'jwt-partner'
) {
  constructor(private partnersService: PartnersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    })
  }

  async validate(payload: any) {
    const owner = await this.partnersService.getPartnerById(payload.id)
    if (!owner) {
      throw new UnauthorizedException()
    }

    return owner
  }
}
