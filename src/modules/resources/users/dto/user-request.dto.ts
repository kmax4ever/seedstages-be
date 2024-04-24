import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { UserRole } from './general.dto'
import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsNotEmpty()
  password: string

  @ApiProperty()
  @IsNotEmpty()
  fullName: string

  // @ApiProperty()
  // @IsNotEmpty()
  // role: string

  @ApiProperty()
  @IsOptional()
  isActivated: boolean
}

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @ApiProperty()
  password: string
}

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty()
  password: string

  @IsOptional()
  @ApiProperty()
  fullName: string

  @ApiProperty()
  @IsNotEmpty()
  role: string

  @ApiProperty()
  @IsOptional()
  isActivated: boolean
}
