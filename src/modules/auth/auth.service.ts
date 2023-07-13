import { Injectable } from "@nestjs/common";
import { hashPassword } from "@/libs/password";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "@/shared/services/prisma.service";
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

    if (user.password !== (await hashPassword(password))) {
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
      }
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
