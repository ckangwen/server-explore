
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt"
import { AuthService } from './auth.service';
import { JwtPayload } from "./auth.interface"
import globalConfig from "@/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService
  ) {

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: globalConfig.jwt.secretKey,
      ignoreExpiration: false,
    }

    super(options)
  }


  async validate(payload: JwtPayload) {
    const user = await this.authService.verifyJwtPayload(payload)
    if (user) {
      return user
    }
    throw new UnauthorizedException('身份已过期')
  }

}