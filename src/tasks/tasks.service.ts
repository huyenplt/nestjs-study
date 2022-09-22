import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';


@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: 'asd1',
      title: 'Task One',
      description: 'Task One Desc'
    },
    {
      id: 'qwe2',
      title: 'Task Two',
      description: 'Task Two Desc'
    },
    {
      id: 'zxc3',
      title: 'Task Three',
      description: 'Task Three Desc'
    }
  ];

  create(createTaskDto: CreateTaskDto): Task {
    const task = { id: Math.floor((Math.random()*10000)+1).toString(), ...createTaskDto };

    this.tasks.push(task);

    return task;
  }

  findAll(): Task[] {
    return [...this.tasks];
  }

  findOne(id: string): Task {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    return {...task}
  }

  update(id: string, updateTaskDto: CreateTaskDto) {
    const taskIdx = this.tasks.findIndex(t => t.id === id);

    this.tasks[taskIdx] = { ...this.tasks[taskIdx], ...updateTaskDto }

    return { ...this.tasks[taskIdx] }
  }

  remove(id: string) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) {
      throw new NotFoundException();
    }

    const taskIdx = this.tasks.indexOf(task);

    this.tasks.splice(taskIdx, 1);

    return `task ${id} has been deleted`
  }
}
