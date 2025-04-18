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
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';

@Controller('student')
@ApiTags('学生管理')
@ApiBearerAuth()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取学生列表' })
  @Get()
  async getStudentList() {
    return this.studentService.getStudentList();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取学生订单列表' })
  @Get('/order')
  async getOrderList(@Request() req) {
    return this.studentService.getOrderList(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取学生交易记录' })
  @Get('/transaction')
  async getTransactionList(@Request() req) {
    return this.studentService.getTransactionList(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '学生充值' })
  @Put('/recharge')
  async recharge(@Request() req, @Query('money', ParseIntPipe) money: number) {
    return this.studentService.recharge(Number(req.user.userId), money);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '学生缴纳水费' })
  @Put('/recharge/water')
  async rechargeWater(
    @Request() req,
    @Query('money', ParseIntPipe) money: number,
  ) {
    return this.studentService.rechargeWater(Number(req.user.userId), money);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '学生缴纳电费' })
  @Put('/recharge/lightning')
  async rechargeLightning(
    @Request() req,
    @Query('money', ParseIntPipe) money: number,
  ) {
    return this.studentService.rechargeLightning(
      Number(req.user.userId),
      money,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改学生信息' })
  @Put(':id')
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: CreateStudentDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加学生' })
  @Post()
  async addStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.addStudent(createStudentDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除学生' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '学生id',
  })
  @Delete(':id')
  async deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.deleteStudent(id);
  }
}
