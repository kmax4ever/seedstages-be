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
  UpdateSeedStageDto
} from '@/modules/resources/seedstage/dto/request.dto'
import { UpdateProjectDto } from '@/modules/resources/projects/dto/request.dto'

@Injectable()
export class AdminCmsService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private seedstagesService: SeedstagesService,
    private iouTokensService: IouTokensService,
    private seedstageRoundsService: SeedstageRoundsService,
    private ethersService: EthersService
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
    const round = await this.seedstageRoundsService.getStageRoundById(
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

  // async createSeedstage(createSeedstageDto: CreateSeedstageDto) {
  //   const project = await this.projectsService.getProjectById(
  //     createSeedstageDto.project
  //   )

  //   if (!project) {
  //     throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
  //   }

  //   const iouToken = await this.iouTokensService.getIouToken(
  //     createSeedstageDto.iouToken
  //   )

  //   if (!iouToken) {
  //     throw new HttpException('iou token not found', HttpStatus.NOT_FOUND)
  //   }
  //   return this.seedstagesService.createSeedstage(createSeedstageDto)
  // }

  // async createIouToken(createIouTokenDto: CreateIouTokenDto) {
  //   const project = await this.projectsService.getProjectById(
  //     createIouTokenDto.project
  //   )

  //   if (!project) {
  //     throw new HttpException('Project not found', HttpStatus.NOT_FOUND)
  //   }
  //   return this.iouTokensService.updateIouToken(createIouTokenDto)
  // }

  // async creatStageRound(createStageRoundDto: CreateStageRoundDto) {
  //   return this.seedstageRoundsService.createStageRound(createStageRoundDto)
  // }
}
