import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuList(id: number) {
    return await this.prisma.menu.findMany({ where: { businessId: id } });
  }

  async getMenuListByBusinessId(id: number) {
    return await this.prisma.menu.findMany({
      where: { businessId: id, status: true },
    });
  }

  async getMenuById(id: number) {
    return await this.prisma.menu.findUnique({ where: { id } });
  }

  async updateMenuStatus(id: number, status: boolean) {
    return await this.prisma.menu.update({ where: { id }, data: { status } });
  }

  async updateMenu(id, updateMenuDto: CreateMenuDto) {
    return await this.prisma.menu.update({
      where: { id: Number(id) },
      data: updateMenuDto,
    });
  }

  async addMenu(createMenuDto: CreateMenuDto, userId: string) {
    return await this.prisma.menu.create({
      data: {
        ...createMenuDto,
        businessId: Number(userId),
        status: false,
      },
    });
  }

  async deleteMenu(id) {
    return await this.prisma.menu.delete({ where: { id } });
  }
}
