import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local/local.strategy';
import { SessionModule } from 'src/session/session.module';
import { TokenService } from './token.service';
import { GlobalJwtModule } from '../common/jwt/jwt.module';
import { JwtRefreshGuard } from './jwt/jwt-refresh.guard';

@Module({
    imports: [PassportModule, UserModule, SessionModule, GlobalJwtModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokenService,
        LocalStrategy,
        JwtStrategy,
        JwtRefreshGuard,
    ],
    exports: [TokenService, JwtRefreshGuard],
})
export class AuthModule {}
