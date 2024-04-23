import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  CmsCreateIouTokenDto,
  CmsCreateStageRoundDto,
  CmsSetTokenAdmin,
  CmsUpdateRound,
  CreateProjectDto,
  CreateStageRoundDto,
  LoginDto
} from './dto/request.dto'
import { UsersService } from '@/modules/resources/users/users.service'
import { AuthService } from '@/modules/shared/auth/auth.service'
import { ProjectsService } from '@/modules/resources/projects/projects.service'
import { SeedstagesService } from '@/modules/resources/seedstage/seedstage.service'
import { SeedstageRoundsService } from '@/modules/resources/seedstage-round/seedstage-round.service'
import { IouTokensService } from '@/modules/resources/iou-token/iou-token.service'
import { EthersService } from '@/modules/adapters/ethers/ethers.service'
import {
  CreateSeedstageDto,
  GetStagesDto,
  UpdateSeedStageDto
} from '@/modules/resources/seedstage/dto/request.dto'
import {
  GetProjectsDto,
  UpdateProjectDto
} from '@/modules/resources/projects/dto/request.dto'
import { PaginationQueriesDto } from '@/modules/common/dto/pagination.dto'
import { DepositTokensService } from '@/modules/resources/deposit-token/deposit-token.service'
import {
  CreateDepositTokenDto,
  UpdateDepositTokenDto
} from '@/modules/resources/deposit-token/dto/request.dto'
import { UpdateIOUTokenDto } from '@/modules/resources/iou-token/dto/request.dto'
import { GetDepositHistoryDto } from '@/modules/resources/deposit-history/dto/request.dto'
import { DepositHistorysService } from '@/modules/resources/deposit-history/deposit-history.service'

@Injectable()
export class AdminCmsService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private seedstagesService: SeedstagesService,
    private iouTokensService: IouTokensService,
    private seedstageRoundsService: SeedstageRoundsService,
    private ethersService: EthersService,
    private depositTokensService: DepositTokensService,
    private depositHistorysService: DepositHistorysService
  ) {}

  async login(loginData: LoginDto) {
    const cmsUser = await this.usersService.attempt(
      loginData.username,
      loginData.password
    )

    return this.authService.generateUserAccessToken(cmsUser)
  }
  //TODO REMOVE WHEN HAS CMS FE
  async createProject(createProjectDto: CreateProjectDto) {
    const txhash = await this.ethersService.createProject(
      createProjectDto.projectName,
      createProjectDto.projectCode
    )
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }
  //TODO REMOVE WHEN HAS CMS FE
  async createSeedStage(createSeedStageDto: CreateSeedstageDto) {
    const txhash = await this.ethersService.createSeedStage(createSeedStageDto)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }
  //TODO REMOVE WHEN HAS CMS FE
  async createIouToken(createDto: CmsCreateIouTokenDto) {
    const txhash = await this.ethersService.createIouToken(createDto)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }

  //TODO REMOVE WHEN HAS CMS FE
  async createRound(createDto: CmsCreateStageRoundDto) {
    const txhash = await this.ethersService.createRound(createDto)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }

  //TODO REMOVE WHEN HAS CMS FE
  async getTokens() {
    return await this.ethersService.getIOUToken()
  }

  //TODO REMOVE WHEN HAS CMS FE
  async setAdmin(setAdminDto: CmsSetTokenAdmin) {
    const txhash = await this.ethersService.setTokenAdmin(
      setAdminDto.tokenAddress,
      setAdminDto.seedStageAddress
    )
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }

  async updateProject(projectId: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectsService.getProjectById(projectId)
    if (!project) {
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND)
    }
    const existsDomain = await this.projectsService.getProjectBySudomain(
      updateProjectDto.subdomain
    )

    if (existsDomain) {
      throw new HttpException('EXISTS DOMAIN!', HttpStatus.BAD_REQUEST)
    }
    return await this.projectsService.updateProject(projectId, updateProjectDto)
  }

  async updateSeedStage(
    seedStageAddress: string,
    updateDto: UpdateSeedStageDto
  ) {
    const project = await this.seedstagesService.getStageById(seedStageAddress)
    if (!project) {
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND)
    }
    return await this.seedstagesService.updateInfo(seedStageAddress, updateDto)
  }

  async updateSeedStageRound(
    seedStageAddress: string,
    roundId: string,
    updateDto: CmsUpdateRound
  ) {
    const round = await this.seedstageRoundsService.getRoundById(
      seedStageAddress,
      roundId
    )
    if (!round) {
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND)
    }
    return await this.seedstageRoundsService.updateRound(
      seedStageAddress,
      roundId,
      updateDto
    )
  }

  async deleteProject(projectId: string) {
    const project = await this.projectsService.getProjectById(projectId)
    if (!project) {
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND)
    }
    return await this.projectsService.delete(projectId)
  }

  async getProjectById(projectId: string) {
    const project = await this.projectsService.getProjectById(projectId)
    if (!project) {
      throw new HttpException('NOT_FOUND!', HttpStatus.NOT_FOUND)
    }
    return project
  }

  async getProjects(dto: GetProjectsDto) {
    return this.projectsService.getProjects(dto)
  }

  async getDepositTokens() {
    return this.depositTokensService.getList()
  }
  async getDepositByAddress(tokenAddress: string) {
    const token = await this.depositTokensService.getByAddress(tokenAddress)
    if (!token) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return token
  }
  async createDepositToken(createDto: CreateDepositTokenDto) {
    const token = await this.depositTokensService.getByAddress(
      createDto.tokenAddress
    )
    if (token) {
      throw new HttpException('Token exists!', HttpStatus.BAD_REQUEST)
    }
    return this.depositTokensService.create(createDto)
  }

  async updateDepositToken(
    tokenAddress: string,
    updateDto: UpdateDepositTokenDto
  ) {
    const token = await this.depositTokensService.getByAddress(tokenAddress)
    if (!token) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return this.depositTokensService.update(tokenAddress, updateDto)
  }

  async getIouTokenByAddress(tokenAddress: string) {
    const token = await this.iouTokensService.getIouToken(tokenAddress)
    if (!token) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return token
  }

  async getIouTokenByProjectId(projectId: string) {
    return this.iouTokensService.getList(projectId)
  }

  async updateIouToken(tokenAddress: string, updateDto: UpdateIOUTokenDto) {
    const token = await this.iouTokensService.getIouToken(tokenAddress)
    if (!token) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return await this.iouTokensService.updateIouToken(tokenAddress, updateDto)
  }

  async getSeedstage(seedStageAddress: string) {
    const seedStage = await this.seedstagesService.getStageById(
      seedStageAddress
    )
    if (!seedStage) {
      throw new HttpException('NOT FOUND!', HttpStatus.NOT_FOUND)
    }
    return seedStage
  }

  async getSeedStageByProjectid(searchDto: GetStagesDto) {
    return await this.seedstagesService.getStages(searchDto)
  }

  async getRounds(seedStageAddress: string) {
    const seedStage = await this.seedstageRoundsService.getRounds(
      seedStageAddress
    )
    return seedStage
  }

  async getRoundById(seedStageAddress: string, roundId: string) {
    return await this.seedstageRoundsService.getRoundById(
      seedStageAddress,
      roundId
    )
  }

  async getDepositHistory(queryDto: GetDepositHistoryDto) {
    return await this.depositHistorysService.getHistory(queryDto)
  }
}
