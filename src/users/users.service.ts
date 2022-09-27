import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRespository: Repository<User>) {}

    // private readonly users: User[] = [
    //     { 
    //         id: 0,
    //         name: 'Kayle',
    //         username: 'kayl',
    //         password: '1234'
    //     },
    //     {
    //         id: 1,
    //         name: 'Maya',
    //         username: 'maya',
    //         password: '1234'
    //     },
    // ];

    findAll(name?: string): Promise<User[]> {
        if (name) {
            return this.usersRespository.find({where: {name: name}})
        }
        return this.usersRespository.find({
          relations: ['tasks']
        });
    }

    async findOne(username: string): Promise<User> {
        try {
            const user = await this.usersRespository.findOneOrFail({ where: { username: username } });
            return user;
        }
        catch (err) {
          throw err;
        }
    }

    async getOneById(id: number): Promise<User> {
      try {
        const user = await this.usersRespository.findOneOrFail({ where: { id: id } });
        return user;
      }
      catch (err) {
        throw err;
      }
    }

    createUser(createUserDto: CreateUserDto): Promise<User> {
        const newUser = this.usersRespository.create({ id: Date.now(), ...createUserDto });

        return this.usersRespository.save(newUser)
    }

    async updateUser(id: number, name: string, username: string): Promise<User> {
        const user = await this.getOneById(id);
    
        user.name = name;
        user.username = username;
    
        return this.usersRespository.save(user);
      }
    
      async deleteUser(id: number): Promise<User> {
        const user = await this.getOneById(id);
    
        return this.usersRespository.remove(user);
      }
}
