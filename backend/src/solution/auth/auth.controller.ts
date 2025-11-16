import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Request, Response } from 'express';
import { User } from 'src/user/user.entity';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AccessTokenPayload } from 'src/types/AccessTokenPayload';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RolesGuard } from './jwt/roles.guard';
import { Roles } from './jwt/roles.decorator';

@Controller('s/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() body: SignUpDto) {
        return await this.authService.register(body);
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const login = await this.authService.login(req.user as User);

        res.cookie('refresh_token', login.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
        });

        return login;
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const user = req.user as AccessTokenPayload;
        const token = req.cookies['refresh_token'] as string;

        if (!token) throw new UnauthorizedException('Invalid refresh token');

        res.clearCookie('refresh_token');

        return this.authService.logout(user.sub, token);
    }

    @Post('refresh')
    async refresh(@Req() req: Request) {
        const token = req.cookies['refresh_token'] as string;

        return await this.authService.refresh(token);
    }

    @Get('role')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getRole(@Req() req: Request) {
        const user = req.user as AccessTokenPayload;
        return { role: user.role };
    }

    @Get('user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('USER', 'ADMIN')
    routeUser() {
        return 'Ruta de usuario.';
    }

    @Get('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('ADMIN')
    routeAdmin() {
        return 'Ruta de admin.';
    }
}
