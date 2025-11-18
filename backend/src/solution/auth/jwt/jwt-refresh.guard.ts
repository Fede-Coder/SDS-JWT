import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { TokenService } from '../token.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SessionService } from 'src/session/session.service';
import { AccessTokenPayload } from 'src/types/AccessTokenPayload';

@Injectable()
export class JwtRefreshGuard extends JwtAuthGuard {
    constructor(
        private readonly tokenService: TokenService,
        private readonly sessionService: SessionService,
        private readonly jwtService: JwtService,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        try {
            const result = super.canActivate(context);

            return result instanceof Promise ? await result : Boolean(result);
        } catch {
            const refreshToken = req.cookies['refresh_token'] as string;
            if (!refreshToken) throw new UnauthorizedException();

            const hashedToken = this.tokenService.hashToken(refreshToken);

            const session =
                await this.sessionService.findSessionByToken(hashedToken);
            if (!session) throw new UnauthorizedException();

            const newAccessToken = await this.jwtService.signAsync({
                sub: session.user.id,
                email: session.user.email,
                firstName: session.user.firstName,
                lastName: session.user.lastName,
                role: session.user.role,
            });

            const decoded =
                this.jwtService.decode<AccessTokenPayload>(newAccessToken);

            res.setHeader('Authorization', `Bearer ${newAccessToken}`);

            req.user = {
                sub: session.user.id,
                email: session.user.email,
                firstName: session.user.firstName,
                lastName: session.user.lastName,
                role: session.user.role,
                iat: decoded.iat,
                exp: decoded.exp,
            };
            return true;
        }
    }
}
