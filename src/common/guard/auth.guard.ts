import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

@Injectable()
export class JWTAuthGuard extends AuthGuard(Strategy.name) {}
