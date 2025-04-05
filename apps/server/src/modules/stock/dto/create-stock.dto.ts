import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty({
    example: '1号',
    description: '货架名字',
  })
  goodName: string;

  @ApiProperty({
    example: 'Date',
    description: '存放时间',
  })
  startTime: Date;

  @ApiProperty({
    example: 'Date',
    description: '过期时间',
  })
  endTime: Date;

  @ApiProperty({
    example: 1,
    description: '数量',
  })
  num: number;

  @ApiProperty({
    example: 1,
    description: '种类',
  })
  speciesId: number;

  @ApiProperty({
    example: 1,
    description: '商家编号',
  })
  businessId: number;
}
