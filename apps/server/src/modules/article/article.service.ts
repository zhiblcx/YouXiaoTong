import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  async getArticleList() {
    return await this.prisma.article.findMany();
  }

  async addArticle(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async deleteArticle(id: number) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
