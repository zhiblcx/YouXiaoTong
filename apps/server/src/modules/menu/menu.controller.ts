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
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('菜品管理')
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取菜品列表' })
  @Get()
  async getMenuList(@Request() req) {
    return this.menuService.getMenuList(req.user.userId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改菜品信息' })
  @Put(':id')
  async updateMenu(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMenuDto: CreateMenuDto,
  ) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加菜品' })
  @Post()
  async addMenu(@Request() req, @Body() createMenuDto: CreateMenuDto) {
    return this.menuService.addMenu(createMenuDto, req.user.userId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除菜品' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '菜品id',
  })
  @Delete(':id')
  async deleteMenu(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.deleteMenu(id);
  }
}
