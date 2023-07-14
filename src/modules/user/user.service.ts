import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/common/prisma.service";
import { USER_RESPONSE_MSG } from "@/constants";
import { hashPassword } from "@/utils/password";
import { CommonResponse } from "@/types";

import { CreateUserDTO } from "./user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({ name, password, email }: CreateUserDTO): Promise<
  CommonResponse<{
    id: string;
    name: string;
    email: string;
  }>
  > {
    const existUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (existUser) {
      return {
        ok: false,
        msg: USER_RESPONSE_MSG.EMAIL_EXIST,
      };
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: await hashPassword(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return {
      ok: true,
      data: user,
      msg: USER_RESPONSE_MSG.CREATED,
    };
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
}
