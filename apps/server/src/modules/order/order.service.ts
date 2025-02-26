import { Injectable } from '@nestjs/common';
import { OrderType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async addOrder(userId: number, createOrderDto: CreateOrderDto) {
    const orderList = await Promise.all(
      createOrderDto.order.map(async (item) => {
        const menu = await this.prisma.menu.findUnique({
          where: { id: item.menuId },
        });
        return {
          money: menu.price * item.quantity,
          menuId: item.menuId,
          quantity: item.quantity,
        };
      }),
    );

    const order = await this.prisma.order.create({
      data: {
        addressId: createOrderDto.addressId,
        businessId: createOrderDto.businessId,
        studentId: userId,
        note: createOrderDto.note,
        orderItems: {
          createMany: { data: orderList },
        },
      },
    });

    // 按照商家算总额
    const orderItemList = await this.prisma.orderItem.findMany({
      where: {
        orderId: order.id,
      },
      select: {
        quantity: true,
        menu: true,
      },
    });

    const total = orderItemList.reduce(
      (acc, item) => acc + item.quantity * item.menu.price,
      0,
    );

    await this.prisma.transaction.create({
      data: {
        type: '食堂',
        method: '校园卡',
        money: total,
        studentId: userId,
        businessId: createOrderDto.businessId,
      },
    });

    await this.prisma.student.update({
      where: { id: userId },
      data: {
        money: {
          decrement: total,
        },
      },
    });

    return orderList;
  }

  async updateOrderStatus(id, status: OrderType) {
    return await this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
