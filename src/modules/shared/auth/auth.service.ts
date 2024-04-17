import { UsersService } from '@/modules/resources/users/users.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.attempt(username, pass)
    if (user) {
      return user
    }

    return null
  }

  async loginOwner(owner: any) {
    const payload = {
      ownername: owner.ownername,
      id: owner._id,
      walletAddress: owner.walletAddress
    }
    return {
      id: owner._id,
      token: this.jwtService.sign(payload, {
        expiresIn: parseInt(process.env.JWT_TTL)
      }),
      expiresIn: parseInt(process.env.JWT_TTL)
    }
  }

  async loginUser(user: any) {
    const payload = {
      ownername: user.ownername,
      id: user._id,
      role: user.role
    }
    return {
      id: user._id,
      token: this.jwtService.sign(payload, {
        expiresIn: parseInt(process.env.JWT_TTL)
      }),
      expiresIn: parseInt(process.env.JWT_TTL)
    }
  }

  async loginDepositoryCenter(depositoryCenter: any) {
    const payload = {
      ownername: depositoryCenter.username,
      id: depositoryCenter._id
    }
    return {
      id: depositoryCenter._id,
      token: this.jwtService.sign(payload, {
        expiresIn: parseInt(process.env.JWT_TTL)
      }),
      expiresIn: parseInt(process.env.JWT_TTL)
    }
  }

  async generateOwnerAccessToken(owner: any) {
    const payload = {
      walletAddress: owner.walletAddress,
      id: owner.id,
      username: owner.username
    }
    return {
      ownerId: owner.id,
      walletAddress: owner.walletAddress,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: parseInt(process.env.JWT_TTL)
      }),
      expiresIn: parseInt(process.env.JWT_TTL)
    }
  }

  async generateUserAccessToken(user: any) {
    const payload = {
      id: user.id,
      username: user.username
    }
    return {
      userId: user.id,
      role: user.role,
      accessToken: this.jwtService.sign(payload, {
        expiresIn: parseInt(process.env.JWT_TTL)
      }),
      expiresIn: parseInt(process.env.JWT_TTL)
    }
  }

  async verifyToken(token: string) {
    try {
      const decodeToken = this.jwtService.decode(token)

      if (decodeToken) {
        return decodeToken
      }
    } catch (e) {}

    return false
  }
}
