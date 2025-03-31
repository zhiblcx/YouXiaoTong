import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransporterDto {
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
}
