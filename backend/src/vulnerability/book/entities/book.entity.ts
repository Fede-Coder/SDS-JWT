import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    genre: string;

    @Column({ type: 'date' })
    publicationDate: Date;

    @Column({ type: 'int' })
    pages: number;

    @Column('text')
    description: string;

    @Column({ unique: true })
    isbn: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
