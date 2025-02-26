import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { authType } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(account, pass, type) {
    let user;
    switch (type) {
      case authType.STUDENT:
        user = await this.prisma.student.findUnique({
          where: { id: Number(account) },
        });
        break;
      case authType.BUSINESS:
        user = await this.prisma.business.findUnique({
          where: { id: Number(account) },
        });
        break;
      case authType.ADMIN:
        user = await this.prisma.admin.findUnique({
          where: { account },
        });
    }
    if (user?.password !== pass || user === null) {
      return new UnauthorizedException('账号或者密码错误');
    }

    const payload = { account: user.account, userId: user.id, type: type };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updatePassword(user, passwordDto) {
    const userId = Number(user.userId);
    switch (user.type) {
      case authType.ADMIN: {
        const currentUser = await this.prisma.admin.findUnique({
          where: { id: userId },
        });
        if (currentUser.password === passwordDto.oldPassword) {
          await this.prisma.admin.update({
            where: { id: userId },
            data: { password: passwordDto.newPassword },
          });
        } else {
          return new UnauthorizedException('旧密码错误');
        }
        break;
      }
      case authType.STUDENT: {
        const currentUser = await this.prisma.student.findUnique({
          where: { id: userId },
        });
        if (currentUser.password === passwordDto.oldPassword) {
          await this.prisma.student.update({
            where: { id: userId },
            data: { password: passwordDto.newPassword },
          });
        } else {
          return new UnauthorizedException('旧密码错误');
        }
        break;
      }
      case authType.BUSINESS: {
        const currentUser = await this.prisma.business.findUnique({
          where: { id: userId },
        });
        if (currentUser.password === passwordDto.oldPassword) {
          await this.prisma.business.update({
            where: { id: userId },
            data: { password: passwordDto.newPassword },
          });
        } else {
          return new UnauthorizedException('旧密码错误');
        }
        break;
      }
    }
  }

  async showPerson(user) {
    switch (user.type) {
      case authType.ADMIN: {
        return await this.prisma.admin.findUnique({
          where: { id: Number(user.userId) },
        });
      }
      case authType.STUDENT: {
        return await this.prisma.student.findUnique({
          where: { id: Number(user.userId) },
          select: {
            id: true,
            name: true,
            sex: true,
            age: true,
            money: true,
            dormitory: true,
            Address: {
              where: { isDefault: true },
            },
          },
        });
      }
      case authType.BUSINESS: {
        return await this.prisma.business.findUnique({
          where: { id: Number(user.userId) },
        });
      }
    }
  }

  async showSystem() {
    const studentCount = await this.prisma.student.count();
    const businessCount = await this.prisma.business.count();

    const todayMoneys = await this.prisma.transaction.findMany({
      where: {
        timer: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
        businessId: { not: null },
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
        businessId: { not: null },
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

    const waterAndLightning = await this.prisma.transaction.findMany({
      where: {
        type: {
          in: ['水费', '电费'],
        },
      },
    });

    // 水费总的费用
    const water = waterAndLightning.filter((item) => item.type === '水费');
    const waterTotal = water.reduce((pre, cur) => pre + cur.money, 0);

    // 电费费用
    const lightning = waterAndLightning.filter((item) => item.type === '电费');
    const lightningTotal = lightning.reduce((pre, cur) => pre + cur.money, 0);

    const dishesSales = await this.prisma.menu.findMany({
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

    return {
      studentCount,
      businessCount,
      todayMoney,
      waterTotal,
      lightningTotal,
      dishesSales: dishesSales.slice(0, 10),
      sevenDayMoney,
    };
  }
}
