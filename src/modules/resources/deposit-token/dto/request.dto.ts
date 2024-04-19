import { ApiProperty } from '@nestjs/swagger'
import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  isEthereumAddress
} from 'class-validator'

export class UpdateTokenDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  logo: string

  @ApiProperty({ type: String, required: true })
  @IsString()
  @IsNotEmpty()
  description: string
}

export class CreateTokenDto {
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

  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  tokenAddress: string

  @ApiProperty({ type: String, required: true })
  @IsNumber()
  @IsNotEmpty()
  owner: string
}
