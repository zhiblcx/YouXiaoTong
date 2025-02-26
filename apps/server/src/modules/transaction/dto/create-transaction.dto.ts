import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    example: 1,
    description: '商家Id',
  })
  businessId: number;

  @ApiProperty({
    example: 2,
    description: '金钱',
  })
  money: number;

  @ApiProperty({
    example: '12515121545',
    description: '转账id',
  })
  id: string;
}
