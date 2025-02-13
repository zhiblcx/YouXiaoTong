import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('article')
@ApiTags('文章管理')
@ApiBearerAuth()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  async getArticleList() {
    return this.articleService.getArticleList();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加文章' })
  @Post()
  async addStudent(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.addArticle(createArticleDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除文章' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '文章id',
  })
  @Delete(':id')
  async deleteStudent(@Param('id', ParseIntPipe) id: number) {
    return this.articleService.deleteArticle(id);
  }
}
