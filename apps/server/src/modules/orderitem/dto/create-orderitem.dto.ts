import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderitemDto {
  @ApiProperty({
    example: 1,
    description: '订单id',
  })
  orderId?: number;

  @ApiProperty({
    example: 2,
    description: '菜品id',
  })
  menuId: number;

  @ApiProperty({
    example: 10,
    description: '数量',
  })
  quantity: number;
}
