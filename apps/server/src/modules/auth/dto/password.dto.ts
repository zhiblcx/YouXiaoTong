import { ApiProperty } from '@nestjs/swagger';

export class PasswordDto {
  @ApiProperty({
    example: '123456',
    description: '旧密码',
  })
  oldPassword: string;

  @ApiProperty({
    example: '123456789',
    description: '新密码',
  })
  newPassword: string;
}
