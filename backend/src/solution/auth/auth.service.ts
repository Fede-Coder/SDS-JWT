import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from './token.service';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly sessionService: SessionService,
        private readonly jwtService: JwtService,
        private readonly tokenService: TokenService,
    ) {}

    async validateUser(
        email: string,
        pass: string,
    ): Promise<{ error: boolean; message?: string; payload?: User }> {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            return { error: true, message: 'Invalid email or password' };
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            return { error: true, message: 'Invalid email or password' };
        }

        return { error: false, payload: user };
    }

    async register(dto: SignUpDto): Promise<Partial<User>> {
        const userExist = await this.userService.findByEmail(dto.email);
        if (userExist) throw new UnauthorizedException('Email already exists');

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(dto.password, salt);

        const newUser = await this.userService.create({
            ...dto,
            password: hashedPassword,
        });

        return newUser;
    }

    async login(user: User) {
        const payload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        const access_token = await this.jwtService.signAsync(payload);

        //Se agrega el REFRESH TOKEN
        const refresh_token = this.tokenService.generateRefreshToken();
        const hashedRefreshToken = this.tokenService.hashToken(refresh_token);

        await this.sessionService.createOrReplaceSession(
            user,
            hashedRefreshToken,
            this.tokenService.getRefreshTokenExpirationDate(),
        );

        //--------------------------------------------

        return {
            access_token,
            refresh_token,
        };
    }
    //Solución
    async logout(id: string, token: string) {
        const existSession = await this.sessionService.findSessionByUser(id);
        if (!existSession) throw new UnauthorizedException();

        const compare = this.tokenService.compareTokens(
            token,
            existSession.token,
        );

        if (!compare) throw new UnauthorizedException();

        await this.sessionService.deleteSession(id, existSession.token);

        return { message: 'Logged out' };
    }

    async refresh(token: string) {
        if (!token) throw new UnauthorizedException();

        const hashToken = this.tokenService.hashToken(token);

        const session = await this.sessionService.findSessionByToken(hashToken);

        if (!session) throw new UnauthorizedException('Invalid refresh token');

        const user = session.user;

        const payload = {
            sub: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            access_token: accessToken,
        };
    }
}
