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
import { SpeciesService } from './species.service';

@Controller('species')
@ApiTags('种类管理')
@ApiBearerAuth()
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取种类列表' })
  @Get()
  async getStudentList() {
    return this.speciesService.getSpeciesList();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改种类信息' })
  @Put(':id')
  async updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body('label') label: string,
  ) {
    return this.speciesService.updateSpecies(id, label);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加种类' })
  @Post()
  async addStudent(@Body('label') label: string) {
    return this.speciesService.addSpecies(label);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除种类' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '运输id',
  })
  @Delete(':id')
  async deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.speciesService.deleteSpecies(id);
  }
}
