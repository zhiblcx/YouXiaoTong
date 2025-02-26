import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  async getArticleList() {
    return await this.prisma.article.findMany({
      orderBy: {
        timer: 'desc',
      },
    });
  }

  async getArticleListById(id: number) {
    return await this.prisma.article.findUnique({ where: { id } });
  }

  async addArticle(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async updateArticleStatus(id: number, status: boolean) {
    return await this.prisma.article.update({
      where: { id },
      data: { status },
    });
  }

  async updateArticle(id: number, updateArticleDto: CreateArticleDto) {
    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async deleteArticle(id: number) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
