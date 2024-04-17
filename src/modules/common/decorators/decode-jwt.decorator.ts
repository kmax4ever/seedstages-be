import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import jwtDecode from 'jwt-decode'

export const DecodeJWT: () => ParameterDecorator = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext): Promise<unknown> => {
    const request = ctx.switchToHttp().getRequest()
    const jwt: string = request.headers.authorization
    try {
      return jwtDecode(jwt)
    } catch (err) {
      throw new UnauthorizedException('UNAUTHORIZED')
    }
  }
)
