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
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
@ApiTags('菜品管理')
@ApiBearerAuth()
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取菜品列表' })
  @Get('/business/:id')
  async getMenuList(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.getMenuList(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取商家公开菜品' })
  @Get('/public/:id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '商家id',
  })
  async getMenuListByBusinessId(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.getMenuListByBusinessId(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取指定菜品' })
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '菜品id',
  })
  async getMenuById(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.getMenuById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改菜品状态' })
  @Put('/status/:id')
  async updateMenuStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status', ParseBoolPipe) status: boolean,
  ) {
    return this.menuService.updateMenuStatus(id, status);
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
