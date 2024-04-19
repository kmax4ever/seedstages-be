import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  CreateIouTokenDto,
  CreateProjectDto,
  CreateSeedstageDto,
  CreateStageRoundDto,
  LoginDto
} from './dto/request.dto'
import { UsersService } from '@/modules/resources/users/users.service'
import { AuthService } from '@/modules/shared/auth/auth.service'
import { ProjectsService } from '@/modules/resources/projects/projects.service'
import { SeedstagesService } from '@/modules/resources/seedstage/seedstage.service'
import { SeedstageRoundsService } from '@/modules/resources/seedstage-round/seedstage-round.service'
import { IouTokensService } from '@/modules/resources/iou-token/iou-token.service'

@Injectable()
export class AdminCmsService {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private seedstagesService: SeedstagesService,
    private iouTokensService: IouTokensService,
    private seedstageRoundsService: SeedstageRoundsService
  ) {}

  async login(loginData: LoginDto) {
    const cmsUser = await this.usersService.attempt(
      loginData.username,
      loginData.password
    )

    return this.authService.generateUserAccessToken(cmsUser)
  }

  // async createProject(createProjectDto: CreateProjectDto) {
  //   return this.projectsService.createProject(createProjectDto)
  // }

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
