import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async getStudentList() {
    return await this.prisma.student.findMany();
  }

  async getOrderList(userId: number) {
    const orderList = await this.prisma.order.findMany({
      where: { studentId: userId },
      select: {
        timer: true,
        status: true,
        Business: true,
        orderItems: {
          select: {
            quantity: true,
            menu: true,
          },
        },
        address: true,
        note: true,
      },
      orderBy: { timer: 'desc' },
    });
    orderList.forEach((order) => {
      (order as any).total = order.orderItems.reduce(
        (prev, curr) => prev + curr.quantity * curr.menu.price,
        0,
      );
      (order as any).quantity = order.orderItems.reduce(
        (prev, curr) => prev + curr.quantity,
        0,
      );
    });
    return orderList;
  }

  async getTransactionList(userId: number) {
    return await this.prisma.transaction.findMany({
      where: {
        studentId: userId,
      },
      orderBy: {
        timer: 'desc',
      },
    });
  }

  async recharge(userId: number, money: number) {
    await this.prisma.transaction.create({
      data: {
        type: '充值',
        money,
        studentId: userId,
      },
    });
    return await this.prisma.student.update({
      where: { id: userId },
      data: { money: { increment: money } },
    });
  }

  async rechargeWater(userId: number, money: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: userId },
    });

    const business = await this.prisma.business.findFirst({
      where: { type: '水电' },
    });

    if (business == null) {
      return new BadRequestException('没有水电商家');
    }

    if (student.money < money) {
      return new BadRequestException('余额不足');
    }

    await this.prisma.transaction.create({
      data: {
        type: '水费',
        method: '校园卡',
        money,
        studentId: userId,
        businessId: business.id,
      },
    });
    return await this.prisma.student.update({
      where: { id: userId },
      data: { money: { decrement: money } },
    });
  }

  async rechargeLightning(userId: number, money: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: userId },
    });

    const business = await this.prisma.business.findFirst({
      where: { type: '水电' },
    });

    if (business == null) {
      return new BadRequestException('没有水电商家');
    }

    if (student.money < money) {
      return new BadRequestException('余额不足');
    }

    await this.prisma.transaction.create({
      data: {
        type: '电费',
        method: '校园卡',
        money,
        studentId: userId,
        businessId: business.id,
      },
    });
    return await this.prisma.student.update({
      where: { id: userId },
      data: { money: { decrement: money } },
    });
  }

  async updateStudent(id: number, updateStudentDto: CreateStudentDto) {
    return await this.prisma.student.update({
      where: { id },
      data: {
        name: updateStudentDto.name,
        age: updateStudentDto.age,
        sex: updateStudentDto.sex,
        dormitory: updateStudentDto.dormitory,
      },
    });
  }

  async addStudent(createStudentDto: CreateStudentDto) {
    return await this.prisma.student.create({
      data: {
        name: createStudentDto.name,
        age: createStudentDto.age,
        sex: createStudentDto.sex,
        dormitory: createStudentDto.dormitory,
        password: '123456',
      },
    });
  }

  async deleteStudent(id: number) {
    return await this.prisma.student.delete({
      where: {
        id: id,
      },
    });
  }
}
