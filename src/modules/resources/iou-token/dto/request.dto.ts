import { ApiProperty } from '@nestjs/swagger'
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl
} from 'class-validator'

export class CreateIouTokenDto {
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
  @IsNumber()
  @IsNotEmpty()
  ownerAddress: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  description: string
}
