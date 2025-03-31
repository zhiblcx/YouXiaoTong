import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransporterDto } from '../Transporter/dto/create-Transporter.dto';
import { TransporterService } from './transporter.service';

@Controller('transporter')
@ApiTags('运输管理')
@ApiBearerAuth()
export class TransporterController {
  constructor(private readonly transporterService: TransporterService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取运输员列表' })
  @Get()
  async getStudentList() {
    return this.transporterService.getTransporterList();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改运输员信息' })
  @Put(':id')
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTransporterDto: CreateTransporterDto,
  ) {
    return this.transporterService.updateTransporter(id, updateTransporterDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加运输员' })
  @Post()
  async addStudent(@Body() createStudentDto: CreateTransporterDto) {
    return this.transporterService.addTransporter(createStudentDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除运输员' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '运输id',
  })
  @Delete(':id')
  async deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.transporterService.deleteTransporter(id);
  }
}
