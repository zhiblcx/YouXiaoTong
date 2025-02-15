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
