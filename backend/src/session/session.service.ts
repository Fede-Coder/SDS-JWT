import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { MoreThan, Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
    ) {}

    async createOrReplaceSession(user: User, token: string) {
        const existingSession = await this.findSessionByUser(user.id);
        if (existingSession)
            await this.sessionRepository.delete({ id: existingSession.id });

        const session = await this.createSession(
            user,
            token,
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        );
        return session.token;
    }

    async findSessionByUser(id: string) {
        return this.sessionRepository.findOne({
            where: { user: { id }, expiresAt: MoreThan(new Date()) },
        });
    }

    async findSessionByToken(token: string) {
        return this.sessionRepository.findOne({
            where: { token, expiresAt: MoreThan(new Date()) },
            relations: ['user'],
        });
    }

    async createSession(user: User, token: string, expiresAt: Date) {
        const session = this.sessionRepository.create({
            user,
            token,
            expiresAt,
        });
        await this.sessionRepository.save(session);

        return session;
    }

    async deleteSession(id: string, token: string): Promise<void> {
        await this.sessionRepository.delete({ user: { id }, token });
    }
}
