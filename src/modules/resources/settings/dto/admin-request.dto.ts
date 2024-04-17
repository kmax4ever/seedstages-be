import { IsBoolean, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateSettingsDto {
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isMaintanance?: boolean
}
