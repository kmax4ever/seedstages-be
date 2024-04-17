import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { Type } from 'class-transformer'

export class CreateOwnerDto {
  @ApiProperty()
  @IsNotEmpty()
  walletAddress: string

  @ApiProperty()
  @IsNotEmpty()
  role: string
}

export class UpdateOwnerDto {
  @IsOptional()
  @IsString()
  nonce?: string

  @IsOptional()
  @IsString()
  username?: string

  @IsOptional()
  @IsString()
  avatar?: string

  @IsOptional()
  @IsString()
  firstName?: string

  @IsOptional()
  @IsString()
  lastName?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  phoneNumber?: string

  @IsOptional()
  @IsDate()
  dateOfBirth?: string

  @IsOptional()
  @IsString()
  telegram?: string

  @IsOptional()
  @IsString()
  twitter?: string
}

export class GetOwnerQueriesDto extends PaginationQueriesDto {
  @ApiProperty({ type: String, required: false, default: '' })
  @IsOptional()
  @IsString()
  search: string
}

export class UpdateOwnerKycDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  lastName?: string

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email?: string

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isEmailVerified?: boolean

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  phoneNumber?: string

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isPhoneNumberVerified?: boolean

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @IsNotEmpty()
  dateOfBirth?: Date

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  twitter?: string

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isTwitterVerified?: boolean

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  telegram?: string

  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  isTelegramVerified?: boolean
}
