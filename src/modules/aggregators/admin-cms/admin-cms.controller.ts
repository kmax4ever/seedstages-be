import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete,
  Request,
  Query
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import {
  CmsCreateIouTokenDto,
  CmsCreateStageRoundDto,
  CmsSetTokenAdmin,
  CmsUpdateRound,
  CreateProjectDto,
  CreateStageRoundDto,
  LoginDto
} from './dto/request.dto'
import { JwtUserAuthGuard } from '@/modules/common/guards/jwt-user-auth.guard'
import { LoginResponse } from './dto/response.dto'
import { AdminCmsService } from './admin-cms.service'
import {
  CreateSeedstageDto,
  UpdateSeedStageDto
} from '@/modules/resources/seedstage/dto/request.dto'
import {
  GetProjectsDto,
  UpdateProjectDto
} from '@/modules/resources/projects/dto/request.dto'
import {
  CreateDepositTokenDto,
  UpdateDepositTokenDto
} from '@/modules/resources/deposit-token/dto/request.dto'

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

  @Post('temp/setAmin')
  async setAdmin(@Body() createDto: CmsSetTokenAdmin) {
    return this.adminCmsService.setAdmin(createDto)
  }

  @Patch('project/:projectId')
  async updateProject(
    @Param('projectId') projectId: string,
    @Body() updateDto: UpdateProjectDto
  ) {
    return await this.adminCmsService.updateProject(projectId, updateDto)
  }

  @Patch('seedStage/:seedStageAddress')
  async updateSeedStage(
    @Param('seedStageAddress') seedStageAddress: string,
    @Body() updateDto: UpdateSeedStageDto
  ) {
    return await this.adminCmsService.updateSeedStage(
      seedStageAddress,
      updateDto
    )
  }

  @Patch('round/:seedStageAddress/:roundId')
  async updateRound(
    @Param('seedStageAddress') seedStageAddress: string,
    @Param('roundId') roundId: string,
    @Body() updateDto: CmsUpdateRound
  ) {
    return await this.adminCmsService.updateSeedStageRound(
      seedStageAddress,
      roundId,
      updateDto
    )
  }
  @Delete('project/:projectId')
  async deleteProject(@Param('projectId') projectId: string) {
    return await this.adminCmsService.deleteProject(projectId)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseGuards(JwtUserAuthGuard)
  @Get('project/:projectId')
  async getProjectById(@Param('projectId') projectId: string) {
    return await this.adminCmsService.getProjectById(projectId)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseGuards(JwtUserAuthGuard)
  @Get('projects')
  async getProjects(@Request() req: any, @Query() query: GetProjectsDto) {
    return await this.adminCmsService.getProjects(query)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseGuards(JwtUserAuthGuard)
  @Get('deposit-token')
  async getListDepositTokens(@Request() req: any) {
    return await this.adminCmsService.getDepositTokens()
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseGuards(JwtUserAuthGuard)
  @Get('deposit-token/:tokenAddress')
  async getDepositTokenByAddress(
    @Request() req: any,
    @Param('tokenAddress') tokenAddress: string
  ) {
    return await this.adminCmsService.getDepositByAddress(tokenAddress)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseGuards(JwtUserAuthGuard)
  @Post('deposit-token')
  async createDepositToken(
    @Request() req: any,
    @Body() body: CreateDepositTokenDto
  ) {
    return await this.adminCmsService.createDepositToken(body)
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  //@UseGuards(JwtUserAuthGuard)
  @Patch('deposit-token/:tokenAddress')
  async updateDepositToken(
    @Request() req: any,
    @Param('tokenAddress') tokenAddress: string,
    @Body() body: UpdateDepositTokenDto
  ) {
    return await this.adminCmsService.updateDepositToken(tokenAddress, body)
  }
}
