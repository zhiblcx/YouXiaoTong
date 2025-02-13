import { ApiProperty } from '@nestjs/swagger';

export class PasswordStudentDto {
  @ApiProperty({
    example: '123456',
    description: '旧密码',
  })
  oldPassword: string;

  @ApiProperty({
    example: '新密码',
    description: '姓名',
  })
  newPassword: string;
}
