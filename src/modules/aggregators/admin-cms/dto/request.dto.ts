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
  projectId: string

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

export class CreateSeedstageDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  projectId: string

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
