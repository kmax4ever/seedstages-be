import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator'
import { RoundType } from './general.dto'
