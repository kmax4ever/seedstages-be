import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  CmsCreateIouTokenDto,
  CmsCreateStageRoundDto,
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
import { CreateSeedstageDto } from '@/modules/resources/seedstage/dto/request.dto'

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
    console.log(txhash)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }
  //TODO REMOVE WHEN HAS CMS FE
  async createSeedStage(createSeedStageDto: CreateSeedstageDto) {
    const txhash = await this.ethersService.createSeedStage(createSeedStageDto)
    console.log(txhash)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }
  //TODO REMOVE WHEN HAS CMS FE
  async createIouToken(createDto: CmsCreateIouTokenDto) {
    const txhash = await this.ethersService.createIouToken(createDto)
    console.log(txhash)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
  }

  //TODO REMOVE WHEN HAS CMS FE
  async createRound(createDto: CmsCreateStageRoundDto) {
    const txhash = await this.ethersService.createRound(createDto)
    console.log(txhash)
    if (!txhash) {
      throw new HttpException('ERROR!', HttpStatus.BAD_REQUEST)
    }
    return txhash
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
