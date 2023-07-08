import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import globalConfig from '@/config';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    UserModule,
    JwtModule.register({
      secret: globalConfig.jwt.secretOrKey,
      signOptions: {
        expiresIn: globalConfig.jwt.expiresIn,
      },
    }),
  ],
})
export class AuthModule {}
