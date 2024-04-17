import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ExternalsService } from './externals.service'
import { GetStagesDto } from './dto/request.dto'

@ApiTags('Depository')
@ApiBearerAuth()
@Controller('externals')
export class ExternalsController {
  constructor(private externalsService: ExternalsService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('stages')
  async getStages(@Query() getStagesDto: GetStagesDto) {
    return this.externalsService.getStages(getStagesDto)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('stages/:stageSlug')
  async getStageById(@Param('stageSlug') stageSlug: string) {
    return this.externalsService.getStageBySlug(stageSlug)
  }
}
