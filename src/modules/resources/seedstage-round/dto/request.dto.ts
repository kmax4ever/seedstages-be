import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'
import { RoundType } from './general.dto'

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
