import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

import globalConfig from "@/config";

import { JwtPayload } from "./auth.interface";
import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: globalConfig.jwt.secretKey,
      ignoreExpiration: false,
    };

    super(options);
  }

  /**
   * 由 Passport 调用，用于解析 jwt token
   */
  async validate(payload: JwtPayload) {
    const user = await this.authService.verifyJwtPayload(payload);
    if (user) {
      return user;
    }
    throw new UnauthorizedException("身份验证失败");
  }
}
