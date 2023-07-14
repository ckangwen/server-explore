import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";

import { PrismaService } from "@/common/prisma.service";
import globalConfig from "@/config";
import { AUTH_RESPONSE_MSG } from "@/constants";

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

describe("AuthController", () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
          secret: globalConfig.jwt.secretKey,
          signOptions: {
            expiresIn: globalConfig.jwt.expiresIn,
          },
        }),
      ],
      providers: [AuthService, JwtStrategy, PrismaService],
      controllers: [AuthController],
      exports: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("register new email", async () => {
    const res = await controller.register({
      name: "test",
      email: "test-user@dev.com",
      password: "123456789",
    });

    expect(res.ok).toBe(true);
  });

  it.only("register existing email", async () => {
    const res = await controller.register({
      name: "test",
      email: "test-user@dev.com",
      password: "123456789",
    });

    expect(res.ok).toBe(false);
    expect(res.msg).toBe(AUTH_RESPONSE_MSG.EMAIL_EXIST);
  });
});
