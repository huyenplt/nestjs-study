import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRespository: Repository<Task>) {}
  // tasks: Task[] = [
    // {
    //   id: 'asd1',
    //   title: 'Task One',
    //   description: 'Task One Desc'
    // },
    // {
    //   id: 'qwe2',
    //   title: 'Task Two',
    //   description: 'Task Two Desc'
    // },
    // {
    //   id: 'zxc3',
    //   title: 'Task Three',
    //   description: 'Task Three Desc'
    // }
  // ];

  create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const newTask = this.tasksRespository.create({ 
      id: Math.floor((Math.random()*10000)+1).toString(), 
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

  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.tasksRespository.findOneOrFail({ where: { id: id } });
      return task;
    }
    catch (err) {
      throw err;
    }
  }

  // update(id: string, updateTaskDto: CreateTaskDto) {
  //   const taskIdx = this.tasks.findIndex(t => t.id === id);

  //   this.tasks[taskIdx] = { ...this.tasks[taskIdx], ...updateTaskDto }

  //   return { ...this.tasks[taskIdx] }
  // }

  // remove(id: string) {
  //   const task = this.tasks.find(t => t.id === id);

  //   if (!task) {
  //     throw new NotFoundException();
  //   }

  //   const taskIdx = this.tasks.indexOf(task);

  //   this.tasks.splice(taskIdx, 1);

  //   return `task ${id} has been deleted`
  // }
}
