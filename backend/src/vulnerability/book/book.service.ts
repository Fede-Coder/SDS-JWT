import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    async create(createBookDto: CreateBookDto) {
        const book = this.bookRepository.create(createBookDto);
        return await this.bookRepository.save(book);
    }

    async findAll(page: number = 1, limit: number = 10) {
        const allowedLimits = [10, 20, 30, 40, 50];
        if (!allowedLimits.includes(limit)) {
            limit = 10;
        }
        const offset = (page - 1) * limit;

        const [data, total] = await this.bookRepository.findAndCount({
            skip: offset,
            take: limit,
            order: { title: 'ASC', id: 'ASC' },
        });
        return {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            data,
        };
    }

    async findOne(id: string) {
        return await this.bookRepository.findOneBy({ id });
    }

    async update(id: string, dto: UpdateBookDto) {
        await this.bookRepository.update(id, dto);
        return this.findOne(id);
    }

    async remove(id: string) {
        const book = await this.findOne(id);
        if (!book) return null;
        await this.bookRepository.delete(id);
        return book;
    }
}
