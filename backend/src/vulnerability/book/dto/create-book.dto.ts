import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    genre: string;

    @IsDateString()
    publicationDate: string;

    @IsInt()
    pages: number;

    @IsString()
    description: string;

    @IsString()
    isbn: string;
}
