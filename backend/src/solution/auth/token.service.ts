import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

//Se agrega nuevo servicio de Token
@Injectable()
export class TokenService {
    generateRefreshToken(): string {
        return crypto.randomBytes(48).toString('hex');
    }

    async hashToken(token: string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(token, salt);
    }

    async compareTokens(token: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(token, hashed);
    }
}
