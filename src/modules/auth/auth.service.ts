import { Injectable } from '@nestjs/common';
import { hashPassword } from '@/libs/password';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/shared/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
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

  async createAccessToken(data: { userId: string }) {
    return this.jwtService.signAsync({
      userId: data.userId,
    });
  }
}
