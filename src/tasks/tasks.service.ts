import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRespository: Repository<Task>) {}

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = this.tasksRespository.create({ 
      id: Math.floor((Math.random()*10000)+1), 
      ...createTaskDto, 
      owner: user
    });

    return this.tasksRespository.save(newTask);
  }

  findAll(user: User): Promise<Task[]> {
    return this.tasksRespository.find({
      where: {owner: user},
      relations: ['owner']
    })
  }

  async findOne(id: number): Promise<Task> {
      const task = await this.tasksRespository.findOneOrFail({ where: { id: id } });

      if (!task) throw new NotFoundException()
      
      return task;
    
  }

  async update(id: number, updateTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.findOne(id);

    if (task) {
      const newTask = {...task, ...updateTaskDto};

      return this.tasksRespository.save(newTask);
    }
  }

  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);

    if (task) {
      return this.tasksRespository.remove(task);
    }
  }
}
