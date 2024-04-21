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
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  projectName: string

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  projectCode: string
}

export class CmsCreateIouTokenDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  projectId: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  symbol: string
}

export class CreateStageRoundDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  seedStageAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  roundId: String

  @ApiProperty({ type: Boolean, required: true })
  @IsNumber()
  @IsNotEmpty()
  isWhitelistRound: boolean

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  allocation: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  startTime: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  minAllocationPerAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  maxAllocationPerAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  endTime: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  raisedAmount: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  merkleRoot: string
}

export class UpdateSeedStageRoundDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: true, enum: RoundType })
  @IsString()
  @IsNotEmpty()
  @IsEnum(RoundType)
  roundType: string
}

export class CmsCreateStageRoundDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  seedStageAddress: string
  @ApiProperty({ type: Boolean, required: true })
  @IsNotEmpty()
  isWhitelistRound: boolean

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  allocation: string

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  startTime: number

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  minAllocationPerAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  maxAllocationPerAddress: string

  @ApiProperty({ type: Number, required: true })
  @IsNumber()
  @IsNotEmpty()
  endTime: number

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  merkleRoot: string
}

export class CmsSetTokenAdmin {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  tokenAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  seedStageAddress: string
}

export class CmsUpdateRound {
  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string
}
