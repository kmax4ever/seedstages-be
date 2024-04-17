import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { ConfigService } from '@nestjs/config'
import { rsaDecrypt } from '@/utils/crypto'

@Injectable()
export class DecodeMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const privateKey = this.configService.get('PRIVATE_KEY')
    const bodyData = await rsaDecrypt(privateKey, req.body.data)
    req.body = JSON.parse(bodyData)
    next()
  }
}
