import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBusinessDto {
  @IsNotEmpty({
    message: '姓名不能为空',
  })
  @ApiProperty({
    example: '张三',
    description: '姓名',
  })
  name: string;

  @IsNotEmpty({
    message: '手机号码不能为空',
  })
  @ApiProperty({
    example: '182555550',
    description: '手机号码',
  })
  phone: string;

  @IsNotEmpty({
    message: '员工数量不能为空',
  })
  @ApiProperty({
    example: 10,
    description: '员工数量',
  })
  staff: number;

  @IsNotEmpty({
    message: '类型不能为空',
  })
  @ApiProperty({
    example: '食堂',
    description: '商家类型',
  })
  type: string;
}
