import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockDto } from './dto/create-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async getStockApplicationList(userId: number) {
    return await this.prisma.stock.findMany({
      where: { businessId: userId, status: true },
    });
  }

  async getStockList(userId: number) {
    const stock = await this.prisma.stock.findMany({
      where: { businessId: userId, status: false },
      include: { species: true, Application: true },
      orderBy: { goodName: 'asc' },
    });

    const grouped = stock.reduce((acc, app) => {
      const type = app.goodName;
      if (!acc[type]) {
        acc[type] = { species: app.species.label, num: 0 };
      }
      if (app.Application.type === '入库') {
        acc[type]['num'] += Number(app.num);
      } else {
        acc[type]['num'] -= Number(app.num);
      }
      return acc;
    }, {});

    const resultArray = Object.entries(grouped).map(([goodName, data]) => {
      if (typeof data !== 'object' || data === null) {
        return { goodName, species: '', num: 0 };
      }
      return {
        goodName,
        ...data,
      };
    });
    return resultArray;
  }

  async getAllStockList() {
    const stock = await this.prisma.stock.findMany({
      where: { status: false },
      include: { species: true, Application: true },
      orderBy: { goodName: 'asc' },
    });

    const grouped = stock.reduce((acc, app) => {
      const type = app.goodName;
      if (!acc[type]) {
        acc[type] = { species: app.species.label, num: 0 };
      }
      if (app.Application.type === '入库') {
        acc[type]['num'] += Number(app.num);
      } else {
        acc[type]['num'] -= Number(app.num);
      }
      return acc;
    }, {});

    const resultArray = Object.entries(grouped).map(([goodName, data]) => {
      if (typeof data !== 'object' || data === null) {
        return { goodName, species: '', num: 0 };
      }
      return {
        goodName,
        ...data,
      };
    });
    return resultArray;
  }

  async updateStock(id: number, updateStockDto: CreateStockDto) {
    return await this.prisma.stock.update({
      where: { id },
      data: {
        goodName: updateStockDto.goodName,
        startTime: updateStockDto.startTime,
        endTime: updateStockDto.endTime,
        businessId: updateStockDto.businessId,
        speciesId: updateStockDto.speciesId,
      },
    });
  }

  async addStock(userId: number, createStockDto: CreateStockDto) {
    return await this.prisma.stock.create({
      data: {
        goodName: createStockDto.goodName,
        startTime: createStockDto.startTime,
        endTime: createStockDto.endTime,
        businessId: Number(createStockDto.businessId),
        speciesId: Number(createStockDto.speciesId),
        num: Number(createStockDto.num),
        transporterId: userId,
        status: true,
      },
    });
  }

  async deleteTransporter(id: number) {
    return await this.prisma.transporter.update({
      where: { id },
      data: { isDelete: true },
    });
  }
}
