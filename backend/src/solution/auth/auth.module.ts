import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'src/config/jwt.config';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';
import { SessionModule } from 'src/session/session.module';
import { TokenService } from './token.service';
import tokenConfig from 'src/config/token.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [tokenConfig],
        }),
        PassportModule,
        UserModule,
        SessionModule,
        JwtModule.registerAsync(jwtConfig.asProvider()),
        ConfigModule.forFeature(jwtConfig),
    ],
    controllers: [AuthController],
    providers: [AuthService, TokenService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
