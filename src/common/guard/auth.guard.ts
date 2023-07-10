import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

/**
 * JWT auth guard
 */

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {}
