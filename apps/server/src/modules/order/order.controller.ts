import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderType } from '@prisma/client';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('订单管理')
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加订单' })
  @Post()
  async addStudent(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.addOrder(Number(req.user.userId), createOrderDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改订单状态' })
  @Put('/status/:id')
  async updateArticleStatus(
    @Param('id', ParseIntPipe) id: number,
    @Query('status') status: OrderType,
  ) {
    return this.orderService.updateOrderStatus(id, status);
  }
}
