import { AuthService } from '@/modules/shared/auth/auth.service'
import { Injectable } from '@nestjs/common'
import { GetStagesDto } from './dto/request.dto'
import { SeedstagesService } from '@/modules/resources/seedstage/seedstage.service'
import { SeedstageRoundsService } from '@/modules/resources/seedstage-round/seedstage-round.service'

@Injectable()
export class ExternalsService {
  constructor(
    private authService: AuthService,
    private seedStagesService: SeedstagesService,
    private seedstageRoundsService: SeedstageRoundsService
  ) {}

  async getStages(getStagesDto: GetStagesDto) {
    return this.seedStagesService.getStages(getStagesDto)
  }

  async getStageBySlug(stageSlug: string) {
    const stage = await this.seedStagesService.getStageBySlug(stageSlug)
    const stageRound = await this.seedstageRoundsService.getStageRoundByStageId(
      stage.id
    )
    return { ...stage, stageRound }
  }
}
