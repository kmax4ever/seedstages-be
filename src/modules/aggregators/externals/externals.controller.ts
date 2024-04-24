import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
  Request
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { ExternalsService } from './externals.service'
import { GetStagesDto } from '@/modules/resources/seedstage/dto/request.dto'
import { GetDepositHistoryDto } from '@/modules/resources/deposit-history/dto/request.dto'

@ApiTags('Depository')
@ApiBearerAuth()
@Controller('externals')
export class ExternalsController {
  constructor(private externalsService: ExternalsService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('project/:subdomain')
  async getProjectBySubdomain(@Param('subdomain') subdomain: string) {
    return this.externalsService.getProject(subdomain)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('seedStage/:seedStageAddress')
  async getSeedStage(@Param('seedStageAddress') seedStageAddress: string) {
    return await this.externalsService.getSeedstage(seedStageAddress)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('seedStagesByProjectId')
  async getSeedStages(@Request() req: any, @Query() query: GetStagesDto) {
    return await this.externalsService.getSeedStageByProjectid(query)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('getRounds/:seedStageAddress')
  async getSeedStageRound(@Param('seedStageAddress') seedStageAddress: string) {
    return await this.externalsService.getRounds(seedStageAddress)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('getRoundById/:seedStageAddress/:roundId')
  async getRoundById(
    @Param('seedStageAddress') seedStageAddress: string,
    @Param('roundId') roundId: string
  ) {
    return await this.externalsService.getRoundById(seedStageAddress, roundId)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('depositHistory')
  async getSee(@Query() query: GetDepositHistoryDto) {
    return await this.externalsService.getDepositHistory(query)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('backers/:projectId')
  async getBackers(@Request() req: any, @Param('projectId') projectId: string) {
    return await this.externalsService.getBackers(projectId)
  }
}
