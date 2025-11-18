// src/common/jwt/jwt.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ms from 'ms';

@Global() // 🔹 Hace que sea global
@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const jwtConfig = configService.get<{
                    secret: string;
                    signOptions: { expiresIn: string };
                }>('jwt');
                return {
                    secret: jwtConfig?.secret || 'asd',
                    signOptions: {
                        expiresIn:
                            (jwtConfig?.signOptions
                                .expiresIn as ms.StringValue) || '14D',
                    },
                };
            },
        }),
    ],
    exports: [JwtModule],
})
export class GlobalJwtModule {}
