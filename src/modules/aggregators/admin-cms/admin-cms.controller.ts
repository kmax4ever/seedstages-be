import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  CmsCreateIouTokenDto,
  CmsCreateStageRoundDto,
  CmsSetTokenAdmin,
  CreateProjectDto,
  CreateStageRoundDto,
  LoginDto
} from './dto/request.dto'
import { JwtUserAuthGuard } from '@/modules/common/guards/jwt-user-auth.guard'
import { LoginResponse } from './dto/response.dto'
import { AdminCmsService } from './admin-cms.service'
import { CreateSeedstageDto } from '@/modules/resources/seedstage/dto/request.dto'

@ApiTags('Cms')
@ApiBearerAuth()
@Controller('cms')
export class AdminCmsController {
  constructor(private adminCmsService: AdminCmsService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Login successfully',
    type: LoginResponse
  })
  async login(@Body() loginData: LoginDto) {
    return this.adminCmsService.login(loginData)
  }
  //TODO remove when have cms ui
  @UsePipes(new ValidationPipe({ transform: true }))
  // @UseGuards(JwtUserAuthGuard)
  @Post('temp/projects')
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.adminCmsService.createProject(createProjectDto)
  }

  //TODO remove when have cms ui
  @UsePipes(new ValidationPipe({ transform: true }))
  // @UseGuards(JwtUserAuthGuard)
  @Post('temp/seedStage')
  async createSeedStage(@Body() createDto: CreateSeedstageDto) {
    return this.adminCmsService.createSeedStage(createDto)
  }
  //TODO remove when have cms ui
  @Post('temp/createIouToken')
  async createIouToken(@Body() createDto: CmsCreateIouTokenDto) {
    return this.adminCmsService.createIouToken(createDto)
  }
  @Post('temp/createRound')
  async createRound(@Body() createDto: CmsCreateStageRoundDto) {
    return this.adminCmsService.createRound(createDto)
  }

  @Post('temp/getTokens')
  async getTokens() {
    return this.adminCmsService.getTokens()
  }

  @Post('temp/setAmin')
  async setAdmin(@Body() createDto: CmsSetTokenAdmin) {
    return this.adminCmsService.setAdmin(createDto)
  }
  // @UsePipes(new ValidationPipe({ transform: true }))
  // // @UseGuards(JwtUserAuthGuard)
  // @Post('iou-tokens')
  // async createIouToken(@Body() createIouTokenDto: CreateIouTokenDto) {
  //   return this.adminCmsService.createIouToken(createIouTokenDto)
  // }

  // @UsePipes(new ValidationPipe({ transform: true }))
  // // @UseGuards(JwtUserAuthGuard)
  // @Post('seedstages')
  // async createSeedstages(@Body() createSeedstageDto: CreateSeedstageDto) {
  //   return this.adminCmsService.createSeedstage(createSeedstageDto)
  // }

  // @UsePipes(new ValidationPipe({ transform: true }))
  // // @UseGuards(JwtUserAuthGuard)
  // @Post('seedstage-rounds')
  // async createSeedstageRounds(
  //   @Body() createStageRoundDto: CreateStageRoundDto
  // ) {
  //   return this.adminCmsService.creatStageRound(createStageRoundDto)
  // }
}
