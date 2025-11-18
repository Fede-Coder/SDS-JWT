import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../token.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { SessionService } from 'src/session/session.service';
import { AccessTokenPayload } from 'src/types/AccessTokenPayload';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private readonly sessionService: SessionService,
        private readonly jwtService: JwtService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        const authHeader = req.headers['authorization']?.split(' ')[1];

        try {
            if (!authHeader) throw new UnauthorizedException();
            const payload =
                await this.jwtService.verifyAsync<AccessTokenPayload>(
                    authHeader,
                    {
                        secret: process.env.JWT_SECRET || 'secret',
                    },
                );
            req.user = payload;
            return true;
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
