import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

export class GetProjectsDto extends PaginationQueriesDto {
  @ApiProperty({ type: String, required: false, default: '' })
  @IsOptional()
  @IsString()
  search: string
}

export class UpdateBackerDto {
  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  website: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logo: string
}

export class CreateBackerDto {
  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  projectId: string

  @ApiProperty({ type: String, required: true })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  website: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  logo: string
}
