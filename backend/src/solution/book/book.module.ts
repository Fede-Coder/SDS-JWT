import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { AuthModule } from 'src/vulnerability/auth/auth.module';
import { SessionModule } from 'src/session/session.module';
import { TokenService } from '../auth/token.service';

@Module({
    imports: [TypeOrmModule.forFeature([Book]), AuthModule, SessionModule],
    controllers: [BookController],
    providers: [BookService, TokenService],
})
export class BookModule {}
