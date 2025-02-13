import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({
    example: '张三',
    description: '收件人名字',
  })
  name: string;

  @ApiProperty({
    example: '15611112222',
    description: '电话号码',
  })
  phone: string;

  @ApiProperty({
    example: '详细地址',
    description: '详细地址',
  })
  detail: string;

  @ApiProperty({
    example: '详细地址',
    description: '详细地址',
  })
  isDefault?: boolean; // 是否为默认地址
}
