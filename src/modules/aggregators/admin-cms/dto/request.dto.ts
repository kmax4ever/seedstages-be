import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { RoundType } from '@/modules/resources/seedstage-round/dto/general.dto'
import { StageStatus } from '@/modules/resources/seedstage/dto/general.dto'

import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested
} from 'class-validator'

export class LoginDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  username: string

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  password: string
}

export class CreateProjectDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  slug: string

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  shortDescription: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  fullDescription: string

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  website: string

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  telegram: string

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  twitter: string

  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  discord: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logo: string

  @ApiProperty({ type: String, required: true })
  @IsUrl()
  @IsString()
  @IsNotEmpty()
  banner: string
}

export class CreateSeedstageDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  project: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  iouToken: string

  @ApiProperty({ type: String, required: true, enum: StageStatus })
  @IsString()
  @IsEnum(StageStatus)
  @IsNotEmpty()
  status: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  stageContractAddress: string
}

export class CreateIouTokenDto {
  @ApiProperty({ type: String, required: true })
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  project: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  symbol: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  tokenAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  logo: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  ownerAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  description: string
}

export class CreateStageRoundDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  seedstage: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true, enum: RoundType })
  @IsString()
  @IsNotEmpty()
  @IsEnum(RoundType)
  roundType: string

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  allowcation: number

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  minAllowcation: number

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  maxAllowcation: number

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  startTime: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  endTime: string
}
