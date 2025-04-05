import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinessApplicationList(userId: number) {
    return await this.prisma.stock.findMany({
      where: {
        businessId: userId,
      },
      include: {
        Application: true,
        transporter: true,
      },
    });
  }

  async getTransporterApplicationList(userId: number) {
    return await this.prisma.application.findMany({
      where: {
        transporterId: userId,
      },
      include: {
        Stock: true,
      },
    });
  }

  async updateApplication(id: number, status: number) {
    const application = await this.prisma.application.update({
      where: {
        id: id,
      },
      data: { status },
    });

    if (status === 1) {
      // 同意
      const stock = await this.prisma.stock.findMany({
        where: {
          applicationId: id,
        },
      });

      await this.prisma.stock.update({
        where: {
          id: stock[0].id,
        },
        data: {
          status: false,
        },
      });
    }
    return application;
  }

  async addApplication(
    userId: number,
    createApplicationDto: CreateApplicationDto,
  ) {
    const application = await this.prisma.application.create({
      data: {
        type: createApplicationDto.type,
        status: 0,
        transporterId: userId,
      },
    });

    const stock = await this.prisma.stock.findUnique({
      where: {
        id: createApplicationDto.stockId,
      },
    });

    await this.prisma.stock.update({
      where: {
        id: stock.id,
      },
      data: {
        applicationId: application.id,
      },
    });

    return application;
  }
}
