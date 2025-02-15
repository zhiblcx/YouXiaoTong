import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  async getAddressList(id) {
    return await this.prisma.address.findMany({
      where: { studentId: Number(id) },
    });
  }

  async getAddressById(id: number) {
    return await this.prisma.address.findUnique({
      where: { id: id },
    });
  }

  async updateAddressStatus(userId: number, id: number, status: boolean) {
    if (status) {
      await this.prisma.address.updateMany({
        where: { studentId: userId },
        data: { isDefault: false },
      });
      await this.prisma.address.update({
        where: { id: Number(id) },
        data: { isDefault: status },
      });
    }
  }

  async updateAddress(id: number, updateAddressDto: CreateAddressDto) {
    return await this.prisma.address.update({
      where: { id: Number(id) },
      data: updateAddressDto,
    });
  }

  async addAddress(createAddressDto: CreateAddressDto, userId) {
    return await this.prisma.address.create({
      data: { ...createAddressDto, studentId: Number(userId) },
    });
  }

  async deleteAddress(id: number) {
    return await this.prisma.address.delete({
      where: { id },
    });
  }
}
