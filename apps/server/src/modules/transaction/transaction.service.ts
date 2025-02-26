import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransaction(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });
    return transaction;
  }

  async addTransaction(
    studentId: number,
    createTransactionDto: CreateTransactionDto,
  ) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });
    if (student.money < createTransactionDto.money) {
      return new Error('余额不足');
    } else {
      try {
        await this.prisma.student.update({
          where: { id: studentId },
          data: {
            money: student.money - createTransactionDto.money,
          },
        });
        return await this.prisma.transaction.create({
          data: {
            ...createTransactionDto,
            id: createTransactionDto.id.toString(),
            studentId: studentId,
            method: '二维码',
            type: '食堂',
          },
        });
      } catch (err) {
        return new Error('已付款');
      }
    }
  }
}
