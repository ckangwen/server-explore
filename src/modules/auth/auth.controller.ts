import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AUTH_RESPONSE_MSG } from "@/constants";

import { UserService } from "../user/user.service";
import { LoginDTO, RegisterDTO } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO) {
    const res = await this.userService.createUser(body);

    return res;
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(body: LoginDTO) {
    const user = await this.authService.validateUserPwd(body.email, body.password);

    if (!user) {
      return {
        ok: false,
        msg: AUTH_RESPONSE_MSG.PASSWORD_ERROR,
      };
    }

    const token = await this.authService.createAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      ok: true,
      msg: AUTH_RESPONSE_MSG.LOGIN_SUCCESS,
      data: {
        token,
      },
    };
  }
}
