import { Controller, Post, HttpCode, HttpStatus, Body } from "@nestjs/common";
import { RegisterDTO, LoginDTO } from "./auth.dto";
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";
import { AuthMessage } from "@/constants";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDTO) {
    const user = await this.userService.createUser(body);

    return {
      ok: true,
      data: user,
      msg: AuthMessage.RegisterSuccess,
    };
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(body: LoginDTO) {
    const user = await this.authService.validateUserPwd(body.email, body.password);

    if (!user) {
      return {
        ok: false,
        msg: AuthMessage.PasswordError,
      };
    }

    const token = await this.authService.createAccessToken({
      userId: user.id,
      email: user.email,
    });

    return {
      ok: true,
      msg: AuthMessage.LoginSuccess,
      data: {
        token,
      },
    };
  }
}
