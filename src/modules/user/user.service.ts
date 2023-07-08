import { PrismaService } from '@/shared/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { hashPassword } from '@/libs/password';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(dto: CreateUserDTO) {
    await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hashPassword(dto.password),
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

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

  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }
}
