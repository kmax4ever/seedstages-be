import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

export class GetProjectsDto extends PaginationQueriesDto {
  @ApiProperty({ type: String, required: false, default: '' })
  @IsOptional()
  @IsString()
  search: string
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
