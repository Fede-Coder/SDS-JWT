import { User } from 'src/user/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sessions' })
export class Session {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    token: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'timestamp' })
    expiresAt: Date;
}
