import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/auth.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/create-auth.dto';
import { PasswordDto } from './dto/password.dto';

@Controller('/auth')
@ApiTags('认证')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '登录' })
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(
      signInDto.account,
      signInDto.password,
      signInDto.type,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改密码' })
  @Put('/password')
  updatePassword(@Request() req, @Body() passwordDto: PasswordDto) {
    return this.authService.updatePassword(req.user, passwordDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '查看个人信息' })
  @Get()
  showPerson(@Request() req) {
    return this.authService.showPerson(req.user);
  }
}
