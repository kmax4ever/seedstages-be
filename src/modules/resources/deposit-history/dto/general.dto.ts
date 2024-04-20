import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
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

export class CreateUserDepositDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  seedStageAddress: string
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  user: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  roundId: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  amount: string
}
