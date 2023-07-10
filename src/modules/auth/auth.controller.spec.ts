import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import globalConfig from '@/config';
import { AuthMessage } from '@/constants';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [
        JwtModule.register({
          secret: globalConfig.jwt.secretKey,
          signOptions: {
            expiresIn: globalConfig.jwt.expiresIn,
          },
        }),
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('register new email', async () => {
    const res = await controller.register({
      name: 'test',
      email: 'demo@test.com',
      password: '123456789',
    });

    expect(res.ok).toBe(true);
  });

  it('register existing email', async () => {
    const res = await controller.register({
      name: 'test',
      email: 'demo@test.com',
      password: '123456789',
    });

    expect(res.ok).toBe(false);
    expect(res.msg).toBe(AuthMessage.EmailExist);
  });
});
