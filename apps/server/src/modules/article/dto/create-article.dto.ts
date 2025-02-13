import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: '今天天气很好',
    description: '文章标题',
  })
  title: string;

  @ApiProperty({
    example: 'base64',
    description: '文章图片',
  })
  photo: string;

  @ApiProperty({
    example: '天气晴朗',
    description: '文章内容',
  })
  content: string;
}
