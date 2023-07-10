import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import globalConfig from '@/config';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport'


const jwtModule = JwtModule.register({
  secret: globalConfig.jwt.secretKey,
  signOptions: {
    expiresIn: globalConfig.jwt.expiresIn,
  },
})

@Module({
  imports: [UserModule, PassportModule, jwtModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtStrategy, AuthService, jwtModule],
})
export class AuthModule {}
