import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class SignInDto {
  @IsNotEmpty({ message:"账号不能为空" })
  @ApiProperty({
    example: '20250210',
    description: '账号',
  })
  account: string;

  @IsNotEmpty({
    message:"密码不能为空",
  })
  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;

  @IsNotEmpty({
    message:"请选择类型",
  })
  @ApiProperty({
    example: '学生',
    description: '登录类型',
  })
  type: string;
}
