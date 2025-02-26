import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderitemDto } from 'src/modules/orderitem/dto/create-orderitem.dto';

export class CreateOrderDto {
  @ApiProperty({
    example: 2,
    description: '地址id',
  })
  addressId: number;

  @ApiProperty({
    example: 2,
    description: '商家id',
  })
  businessId: number;

  @ApiProperty({
    example: '少放点辣椒',
    description: '备注',
  })
  note?: string;

  @ApiProperty({
    example: [
      {
        menuId: 1,
        quantity: 22,
      },
    ],
    description: '菜单id和数量',
  })
  order: CreateOrderitemDto[];
}
