import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import ms from 'ms';

@Injectable()
export class TokenService {
    constructor(private readonly configService: ConfigService) {}

    generateRefreshToken(): string {
        return crypto.randomBytes(48).toString('hex');
    }

    hashToken(token: string): string {
        return crypto
            .createHmac(
                'sha256',
                this.configService.get<string>('refresh_token.secretKey') ||
                    'secret-key',
            )
            .update(token)
            .digest('hex');
    }

    compareTokens(token: string, hashed: string): boolean {
        const tokenHash = this.hashToken(token);
        return crypto.timingSafeEqual(
            Buffer.from(tokenHash),
            Buffer.from(hashed),
        );
    }

    getRefreshTokenExpirationDate(): Date {
        const expiresIn =
            this.configService.get<string>('refresh_token.expiresIn') || '14D';

        const msValue = ms(expiresIn.toLowerCase() as ms.StringValue);

        return new Date(Date.now() + msValue);
    }
}
