import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString
} from 'class-validator'
import { StageStatus } from './general.dto'

export class GetStagesDto extends PaginationQueriesDto {
  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  projectId: string

  @ApiProperty({ type: String, required: false, default: '' })
  @IsOptional()
  @IsString()
  search: string

  @ApiProperty({ type: String, required: false, enum: StageStatus })
  @IsOptional()
  @IsString()
  @IsEnum(StageStatus)
  status: string
}

export class CreateSeedstageDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  projectId: string

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  iouToken: string

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  depositToken: string

  // @ApiProperty({ type: String, required: false })
  // @IsNotEmpty()
  // seedStageAddress: string

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  multiSigAddress: string
}

export class UpdateSeedStageDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ type: String, required: false, enum: StageStatus })
  @IsOptional()
  @IsString()
  @IsEnum(StageStatus)
  status: string
}
