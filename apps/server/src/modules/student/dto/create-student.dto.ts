import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({
    message: '姓名不能为空',
  })
  @ApiProperty({
    example: '张三',
    description: '姓名',
  })
  name: string;

  @IsNotEmpty({
    message: '性别不能为空',
  })
  @ApiProperty({
    example: '男',
    description: '性别',
  })
  sex: string;

  @IsNotEmpty({
    message: '年龄不能为空',
  })
  @ApiProperty({
    example: 10,
    description: '年龄',
  })
  age: number;

  @IsNotEmpty({
    message: '宿舍号不能为空',
  })
  @ApiProperty({
    example: '1-108',
    description: '宿舍号',
  })
  dormitory: string;
}
