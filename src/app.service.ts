import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(@InjectRepository(User) private usersRespository: Repository<User>) {}


  getAll(): Promise<User[]> {
    return this.usersRespository.find();
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

  createUser(name: string, username: string): Promise<User> {
    const newUser = this.usersRespository.create({
      id: Date.now(),
      name: name,
      username: username,
      password: '1234'
    })

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

  getHello(): string {
    return 'Hello World!';
  }
}
