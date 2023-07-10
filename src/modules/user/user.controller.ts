import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JWTAuthGuard } from '@/common/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  getUser(@Param('id') userId: string) {
    return this.userService.findUserById(userId);
  }
}
