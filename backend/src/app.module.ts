import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule as AuthModuleVulnerability } from './vulnerability/auth/auth.module';
import { AuthModule as AuthModuleSolution } from './solution/auth/auth.module';
import { BookModule as BookModuleSolution } from './solution/book/book.module';
import { BookModule as BookModuleVulnerability } from './vulnerability/book/book.module';
import tokenConfig from './config/token.config';
import { GlobalJwtModule } from './solution/common/jwt/jwt.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.${process.env.NODE_ENV}.env`,
            load: [tokenConfig],
        }),
        GlobalJwtModule,
        DatabaseModule,
        UserModule,
        SessionModule,
        AuthModuleVulnerability,
        AuthModuleSolution,
        BookModuleSolution,
        BookModuleVulnerability,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
