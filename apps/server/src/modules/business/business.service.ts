import { Injectable } from '@nestjs/common';
import { BusinessType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBusinessDto } from './dto/create-business.dto';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

  async getBusinessList() {
    return await this.prisma.business.findMany();
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

  async addBusiness(createStudentDto: CreateBusinessDto) {
    console.log(createStudentDto);
    return await this.prisma.business.create({
      data: {
        name: createStudentDto.name,
        phone: createStudentDto.phone,
        staff: createStudentDto.staff,
        type: createStudentDto.type as BusinessType,
        password: '123456',
      },
    });
  }

  async deleteBusiness(id: number) {
    return await this.prisma.business.delete({ where: { id } });
  }
}
