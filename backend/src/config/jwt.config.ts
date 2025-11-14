import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import ms from 'ms';

export default registerAs(
    'jwt',
    (): JwtModuleOptions => ({
        secret: process.env.JWT_SECRET || 'secret',
        signOptions: {
            expiresIn: (process.env.JWT_EXPIRESIN as ms.StringValue) || '14D',
        },
    }),
);
