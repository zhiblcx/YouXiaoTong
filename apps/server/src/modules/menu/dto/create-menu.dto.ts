import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({
    example: '辣椒炒肉',
    description: '菜品名字',
  })
  title: string;

  @ApiProperty({
    example: 'base64',
    description: '图片',
  })
  photo: string;

  @ApiProperty({
    example: '很辣',
    description: '菜品描述信息',
  })
  description: string;

  @ApiProperty({
    example: '12.50',
    description: '单价',
  })
  price: number;
}
