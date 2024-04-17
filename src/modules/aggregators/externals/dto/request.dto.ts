import { ListingDuration } from '@/modules/common/const/listing'
import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { StageStatus } from '@/modules/resources/seedstage/dto/general.dto'

import { UserRole } from '@/modules/resources/users/dto/general.dto'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsEthereumAddress,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl
} from 'class-validator'

export class VerifyNonceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string
}

export class GetStagesDto extends PaginationQueriesDto {
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
