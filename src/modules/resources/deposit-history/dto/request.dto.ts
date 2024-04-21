import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'

export class GetDepositHistoryDto extends PaginationQueriesDto {
  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  seedStageAddress: string

  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  roundId: string
}
