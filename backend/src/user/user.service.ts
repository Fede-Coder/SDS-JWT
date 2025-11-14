import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(dto: CreateUserDto): Promise<Partial<User>> {
        const user = this.userRepository.create(dto);

        const savedUser = await this.userRepository.save(user);

        return {
            id: savedUser.id,
            email: savedUser.email,
            firstName: savedUser.firstName,
            lastName: savedUser.lastName,
            role: savedUser.role,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt,
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async findById(id: string): Promise<User> {
        const result = await this.userRepository.findOne({ where: { id } });
        if (!result) throw new NotFoundException('User not found');
        return result;
    }
}
