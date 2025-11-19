import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './database.interface';
import { SqlSeedService } from './sqlseed.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [databaseConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const dbConfig = configService.get<DatabaseConfig>('database');
                return {
                    type: 'postgres',
                    host: dbConfig?.host,
                    port: dbConfig?.port,
                    username: dbConfig?.username,
                    password: dbConfig?.password,
                    database: dbConfig?.database,
                    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                    synchronize: true,
                    logging: false,
                };
            },
        }),
    ],
    providers: [SqlSeedService],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
