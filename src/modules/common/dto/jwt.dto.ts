import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class JwtDto {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNumber()
  @IsNotEmpty()
  iat: number

  @IsNumber()
  @IsNotEmpty()
  exp: number
}
