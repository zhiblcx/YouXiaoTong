import { Injectable } from '@nestjs/common';
import { defaultPassword } from '../auth/constants';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransporterDto } from './dto/create-Transporter.dto';

@Injectable()
export class TransporterService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransporterList() {
    return await this.prisma.transporter.findMany({
      where: { isDelete: false },
    });
  }

  async updateTransporter(
    id: number,
    createTransporterDto: CreateTransporterDto,
  ) {
    return await this.prisma.transporter.update({
      where: { id },
      data: {
        name: createTransporterDto.name,
        phone: createTransporterDto.phone,
      },
    });
  }

  async addTransporter(createTransporterDto: CreateTransporterDto) {
    return await this.prisma.transporter.create({
      data: {
        name: createTransporterDto.name,
        phone: createTransporterDto.phone,
        password: defaultPassword,
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
