import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from 'src/user/user.entity';
import { SignInDto } from '../dto/sign-in.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(dto: SignInDto): Promise<User> {
        const result = await this.authService.validateUser(
            dto.email,
            dto.password,
        );

        if (result?.error || !result.payload) {
            throw new UnauthorizedException(result?.message || 'Unauthorized');
        }

        return result.payload;
    }
}
