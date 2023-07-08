import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [SharedModule, UserModule, AuthModule],
})
export class AppModule {}
