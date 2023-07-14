import { Controller, Get, HttpCode, HttpStatus, Param, UseGuards } from "@nestjs/common";

import { JWTAuthGuard } from "@/common/guard/auth.guard";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @UseGuards(JWTAuthGuard)
  getUser(@Param("id") userId: string) {
    return this.userService.findUserById(userId);
  }
}
