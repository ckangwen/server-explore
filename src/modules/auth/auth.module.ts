import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import globalConfig from "@/config";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "./jwt.strategy";
import { PassportModule } from "@nestjs/passport";


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
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
