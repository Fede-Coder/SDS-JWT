import { registerAs } from '@nestjs/config';

export default registerAs('refresh_token', () => ({
    secretKey: process.env.REFRESH_TOKEN_SECRET || 'secret-key',
    expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN || '14D',
}));
