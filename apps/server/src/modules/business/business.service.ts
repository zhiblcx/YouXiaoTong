import { Injectable } from '@nestjs/common';
import { BusinessType } from '@prisma/client';
import { defaultPassword } from '../auth/constants';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinessList() {
    return await this.prisma.business.findMany();
  }

  async getOrderList(userId: number) {
    const orderList = await this.prisma.order.findMany({
      where: { businessId: userId },
      select: {
        id: true,
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

  async getTransaction(userId: number) {
    return await this.prisma.transaction.findMany({
      where: { businessId: userId },
      orderBy: { timer: 'desc' },
    });
  }

  async getMenu(userId: number) {
    return await this.prisma.menu.findMany({
      where: { businessId: userId },
    });
  }

  async showSystem(userId: number) {
    const business = await this.prisma.business.findUnique({
      where: { id: userId },
    });

    let lightningTotal = 0;
    let waterTotal = 0;
    let dishesSales = [];

    if (business.type === '食堂') {
      dishesSales = await this.prisma.menu.findMany({
        where: { businessId: userId },
        select: {
          title: true,
          orderItem: true,
        },
      });

      dishesSales.map((item: any) => {
        item.quantity = item.orderItem.reduce(
          (pre, cur) => pre + cur.quantity,
          0,
        );
      });

      dishesSales.sort((a: any, b: any) => b.quantity - a.quantity);
    } else {
      const waterAndLightning = await this.prisma.transaction.findMany({
        where: {
          type: {
            in: ['水费', '电费'],
          },
        },
      });

      // 水费总的费用
      const water = waterAndLightning.filter((item) => item.type === '水费');
      waterTotal = water.reduce((pre, cur) => pre + cur.money, 0);

      // 电费费用
      const lightning = waterAndLightning.filter(
        (item) => item.type === '电费',
      );
      lightningTotal = lightning.reduce((pre, cur) => pre + cur.money, 0);
    }

    const todayMoneys = await this.prisma.transaction.findMany({
      where: {
        timer: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        businessId: userId,
      },
    });

    const sevenDayMoneys = await this.prisma.transaction.findMany({
      where: {
        timer: {
          gte: new Date(
            new Date().setDate(
              new Date(new Date().setHours(0, 0, 0, 0)).getDate() - 7,
            ),
          ),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        businessId: userId,
      },
    });

    // 根据timer求每一天的总额
    const dailyTotals = sevenDayMoneys.reduce((pre, cur) => {
      const date = new Date(cur.timer);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const key = `${year}-${month}-${day}`;
      if (!pre[key]) {
        pre[key] = 0;
      }

      pre[key] += cur.money;

      return pre;
    }, {});

    const sevenDayMoney = Object.keys(dailyTotals).map((date) => ({
      timer: date,
      money: dailyTotals[date],
    }));

    const todayMoney = todayMoneys.reduce((pre, cur) => pre + cur.money, 0);

    return {
      todayMoney,
      waterTotal,
      lightningTotal,
      dishesSales: dishesSales.slice(0, 10),
      sevenDayMoney,
    };
  }

  async updateBusiness(id: number, updateBusinessDto: CreateBusinessDto) {
    return await this.prisma.business.update({
      where: { id },
      data: {
        name: updateBusinessDto.name,
        phone: updateBusinessDto.phone,
        staff: updateBusinessDto.staff,
        type: updateBusinessDto.type as BusinessType,
      },
    });
  }

  async updateStudentStatus(id: number, status: boolean) {
    return await this.prisma.business.update({
      where: { id },
      data: { status },
    });
  }

  async addBusiness(createStudentDto: CreateBusinessDto) {
    return await this.prisma.business.create({
      data: {
        name: createStudentDto.name,
        phone: createStudentDto.phone,
        staff: createStudentDto.staff,
        type: createStudentDto.type as BusinessType,
        status: createStudentDto.type === '水电',
        password: defaultPassword,
      },
    });
  }

  async deleteBusiness(id: number) {
    return await this.prisma.business.delete({ where: { id } });
  }
}
