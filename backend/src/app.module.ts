import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { SessionModule } from './session/session.module';
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule as AuthModuleVulnerability } from './vulnerability/auth/auth.module';
import { AuthModule as AuthModuleSolution } from './solution/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        DatabaseModule,
        UserModule,
        SessionModule,
        AuthModuleVulnerability,
        AuthModuleSolution,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
