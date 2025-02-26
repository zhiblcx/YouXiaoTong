import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
@ApiTags('账单管理')
@ApiBearerAuth()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '查询二维码订单' })
  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return this.transactionService.getTransaction(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '二维码付款' })
  @Post()
  async addTransaction(
    @Request() req,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.addTransaction(
      Number(req.user.userId),
      createTransactionDto,
    );
  }
}
