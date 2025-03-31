import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpeciesService {
  constructor(private readonly prisma: PrismaService) {}
  async getSpeciesList() {
    return await this.prisma.species.findMany();
  }

  async updateSpecies(id: number, label: string) {
    return await this.prisma.species.update({ where: { id }, data: { label } });
  }

  async addSpecies(label: string) {
    return await this.prisma.species.create({ data: { label } });
  }

  async deleteSpecies(id: number) {
    return await this.prisma.species.delete({ where: { id } });
  }
}
