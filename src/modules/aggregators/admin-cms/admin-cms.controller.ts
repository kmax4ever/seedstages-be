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
  CreateIouTokenDto,
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
  @Post('projects')
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.adminCmsService.createProject(createProjectDto)
  }

  //TODO remove when have cms ui
  @UsePipes(new ValidationPipe({ transform: true }))
  // @UseGuards(JwtUserAuthGuard)
  @Post('seedStage')
  async createSeedStage(@Body() createDto: CreateSeedstageDto) {
    return this.adminCmsService.createSeedStage(createDto)
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
