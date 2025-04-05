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
import { CreateStockDto } from './dto/create-stock.dto';
import { StockService } from './stock.service';

@Controller('stock')
@ApiTags('库存管理')
@ApiBearerAuth()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取库存申请列表' })
  @Get('application')
  async getStockApplicationList(@Request() req) {
    return this.stockService.getStockApplicationList(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取库存列表' })
  @Get()
  async getStockList(@Request() req) {
    return this.stockService.getStockList(Number(req.user.userId));
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取全部库存列表' })
  @Get('all')
  async getAllStockList() {
    return this.stockService.getAllStockList();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改库存信息' })
  @Put(':id')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockDto: CreateStockDto,
  ) {
    return this.stockService.updateStock(id, updateStockDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加库存' })
  @Post()
  async addStock(@Request() req, @Body() createStockDto: CreateStockDto) {
    return this.stockService.addStock(Number(req.user.userId), createStockDto);
  }
}
