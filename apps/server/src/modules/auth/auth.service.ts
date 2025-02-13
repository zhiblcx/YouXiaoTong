import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { authType } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signIn(account, pass, type) {
    let user;
    switch (type) {
      case authType.STUDENT:
        user = await this.prisma.student.findUnique({
          where: { id: Number(account) },
        });
        break;
      case authType.BUSINESS:
        user = await this.prisma.business.findUnique({
          where: { id: Number(account) },
        });
        break;
      case authType.ADMIN:
        user = await this.prisma.admin.findUnique({
          where: { account },
        });
    }

    if (user?.password !== pass || user === null) {
      return new UnauthorizedException('账号或者密码错误');
    }

    const payload = { account: user.account, userId: user.id, type: type };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updatePassword(user, passwordDto) {
    const userId = Number(user.userId);
    switch (user.type) {
      case authType.ADMIN: {
        const currentUser = await this.prisma.admin.findUnique({
          where: { id: userId },
        });
        if (currentUser.password === passwordDto.oldPassword) {
          await this.prisma.admin.update({
            where: { id: userId },
            data: { password: passwordDto.newPassword },
          });
        } else {
          return new UnauthorizedException('旧密码错误');
        }
        break;
      }
      case authType.STUDENT: {
        const currentUser = await this.prisma.student.findUnique({
          where: { id: userId },
        });
        if (currentUser.password === passwordDto.oldPassword) {
          await this.prisma.student.update({
            where: { id: userId },
            data: { password: passwordDto.newPassword },
          });
        } else {
          return new UnauthorizedException('旧密码错误');
        }
        break;
      }
      case authType.BUSINESS: {
        const currentUser = await this.prisma.business.findUnique({
          where: { id: userId },
        });
        if (currentUser.password === passwordDto.oldPassword) {
          await this.prisma.business.update({
            where: { id: userId },
            data: { password: passwordDto.newPassword },
          });
        } else {
          return new UnauthorizedException('旧密码错误');
        }
        break;
      }
    }
  }

  async showPerson(user) {
    switch (user.type) {
      case authType.ADMIN: {
        return this.prisma.admin.findUnique({
          where: { id: Number(user.userId) },
        });
      }
      case authType.STUDENT: {
        return this.prisma.student.findUnique({
          where: { id: Number(user.userId) },
        });
      }
      case authType.BUSINESS: {
        return this.prisma.business.findUnique({
          where: { id: Number(user.userId) },
        });
      }
    }
  }
}
