import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Controller('business')
@ApiTags('商家管理')
@ApiBearerAuth()
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取商家列表' })
  @Get()
  async getStudentList() {
    return this.businessService.getBusinessList();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取商家订单列表' })
  @Get('/order')
  async getOrderList(@Request() req) {
    return this.businessService.getOrderList(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取商家交易列表' })
  @Get('/transaction')
  async getTransaction(@Request() req) {
    return this.businessService.getTransaction(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取商家菜单列表' })
  @Get('/menu')
  async getMenu(@Request() req) {
    return this.businessService.getMenu(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '查看系统信息' })
  @Get('/system/:id')
  showSystem(@Param('id', ParseIntPipe) id: number) {
    return this.businessService.showSystem(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改商家状态' })
  @Put('/status')
  async updateStudentStatus(
    @Request() req,
    @Query('status', ParseBoolPipe) status: boolean,
  ) {
    return this.businessService.updateStudentStatus(
      Number(req.user.userId),
      status,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改商家信息' })
  @Put(':id')
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBusinessDto: CreateBusinessDto,
  ) {
    return this.businessService.updateBusiness(id, updateBusinessDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加商家' })
  @Post()
  async addStudent(@Body() createStudentDto: CreateBusinessDto) {
    return this.businessService.addBusiness(createStudentDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除商家' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '商家id',
  })
  @Delete(':id')
  async deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.businessService.deleteBusiness(id);
  }
}
