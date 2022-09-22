import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        { 
            id: 0,
            name: 'Kayle',
            username: 'kayl',
            password: '1234'
        },
        {
            id: 1,
            name: 'Maya',
            username: 'maya',
            password: '1234'
        },
    ];

    findAll(name?: string): User[] {
        if (name) {
            return this.users.filter(user => user.name === name);
        }
        return this.users;
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    createUser(createUserDto: CreateUserDto): User {
        const newUser = { id: Date.now(), ...createUserDto };

        this.users.push(newUser);

        return newUser;
    }
}
