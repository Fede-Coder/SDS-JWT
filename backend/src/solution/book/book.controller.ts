import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
    UseGuards,
    Header,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtRefreshGuard } from '../auth/jwt/jwt-refresh.guard';
import { RolesGuard } from '../auth/jwt/roles.guard';
import { Roles } from '../auth/jwt/roles.decorator';

@Controller('s/books')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    @UseGuards(JwtRefreshGuard, RolesGuard)
    @Roles('ADMIN')
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }

    @Get()
    @UseGuards(JwtRefreshGuard, RolesGuard)
    @Roles('USER', 'ADMIN')
    @Header('Cache-Control', 'no-store')
    findAll(
        @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
        @Query('limit', new ParseIntPipe({ optional: true }))
        limit: number = 10,
    ) {
        return this.bookService.findAll(page, limit);
    }

    @Get(':id')
    @UseGuards(JwtRefreshGuard, RolesGuard)
    @Roles('USER', 'ADMIN')
    findOne(@Param('id') id: string) {
        return this.bookService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtRefreshGuard, RolesGuard)
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }

    @Delete(':id')
    @UseGuards(JwtRefreshGuard, RolesGuard)
    @Roles('ADMIN')
    remove(@Param('id') id: string) {
        return this.bookService.remove(id);
    }
}
