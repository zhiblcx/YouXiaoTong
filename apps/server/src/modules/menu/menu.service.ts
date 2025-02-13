import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async getMenuList(id) {
    return await this.prisma.menu.findMany({ where: { id } });
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
