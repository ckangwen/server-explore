import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { PrismaService } from "@/common/prisma.service";
import globalConfig from "@/config";

import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    // 提供 UserGuard
    PassportModule.register({ defaultStrategy: "jwt" }),
    // 提供 JwtService
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
})
export class AuthModule {}
