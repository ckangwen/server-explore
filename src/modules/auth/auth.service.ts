import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { PrismaService } from "@/common/prisma.service";
import { verifyPassword } from "@/utils/password";

import { JwtPayload } from "./auth.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserPwd(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isPwdValid = await verifyPassword(password, user.password);
    if (!isPwdValid) {
      return null;
    }

    return user;
  }

  async verifyJwtPayload(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        email: true,
      },
    });

    if (user?.email !== payload.email) {
      return null;
    }

    return user;
  }

  async createAccessToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload);
  }
}
