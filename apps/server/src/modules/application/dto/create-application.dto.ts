import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({
    example: '1号',
    description: '入库还是出库',
  })
  type: string;

  @ApiProperty({
    example: 1,
    description: '库存编号',
  })
  stockId: number;
}
