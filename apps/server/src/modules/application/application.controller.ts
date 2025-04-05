import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Controller('application')
@ApiTags('申请管理')
@ApiBearerAuth()
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '商家获取申请' })
  @Get('business')
  async getBusinessApplicationList(@Request() req) {
    return this.applicationService.getBusinessApplicationList(
      Number(req.user.userId),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '运输员获取申请' })
  @Get('transporter')
  async getTransporterApplicationList(@Request() req) {
    return this.applicationService.getTransporterApplicationList(
      Number(req.user.userId),
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改申请状态' })
  @Put(':id')
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ParseIntPipe) status: number,
  ) {
    return this.applicationService.updateApplication(id, status);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加申请' })
  @Post()
  async addApplication(
    @Request() req,
    @Body() createApplicationDto: CreateApplicationDto,
  ) {
    return this.applicationService.addApplication(
      Number(req.user.userId),
      createApplicationDto,
    );
  }
}
