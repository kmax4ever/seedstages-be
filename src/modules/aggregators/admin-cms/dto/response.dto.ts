import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class LoginResponse {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  token: string

  @ApiProperty({ type: String, required: true })
  @IsNumber()
  expiresIn: number
}
