import { AuthService } from '@/modules/shared/auth/auth.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { SeedstagesService } from '@/modules/resources/seedstage/seedstage.service'
import { SeedstageRoundsService } from '@/modules/resources/seedstage-round/seedstage-round.service'
import { GetStagesDto } from '@/modules/resources/seedstage/dto/request.dto'
import { ProjectsService } from '@/modules/resources/projects/projects.service'
import { DepositHistorysService } from '@/modules/resources/deposit-history/deposit-history.service'
import { GetDepositHistoryDto } from '@/modules/resources/deposit-history/dto/request.dto'
import { BackerService } from '@/modules/resources/backer/backer.service'

@Injectable()
export class ExternalsService {
  constructor(
    private authService: AuthService,
    private seedStagesService: SeedstagesService,
    private seedstageRoundsService: SeedstageRoundsService,
    private projectsService: ProjectsService,
    private depositHistorysService: DepositHistorysService,
    private backerService: BackerService
  ) {}

  async getProject(subdomain: string) {
    const project = await this.projectsService.getProjectBySudomain(subdomain)
    if (!project) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return project
  }

  async getStages(getStagesDto: GetStagesDto) {
    return this.seedStagesService.getStages(getStagesDto)
  }
  async getSeedstage(seedStageAddress: string) {
    const seedStage = await this.seedStagesService.getStageById(
      seedStageAddress
    )
    if (!seedStage) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return seedStage
  }

  async getSeedStageByProjectid(searchDto: GetStagesDto) {
    return await this.seedStagesService.getStages(searchDto)
  }

  async getRounds(seedStageAddress: string) {
    const seedStage = await this.seedstageRoundsService.getRounds(
      seedStageAddress
    )
    return seedStage
  }

  async getRoundById(seedStageAddress: string, roundId: string) {
    const round = await this.seedstageRoundsService.getRoundById(
      seedStageAddress,
      roundId
    )
    if (!round) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return round
  }

  async getDepositHistory(queryDto: GetDepositHistoryDto) {
    return await this.depositHistorysService.getHistory(queryDto)
  }

  async getBackers(projectId: string) {
    return await this.backerService.getByProjectId(projectId)
  }
}
