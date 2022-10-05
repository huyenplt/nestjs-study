import { Controller, UseGuards, Request, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './entities/task.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiCreatedResponse({ type: Task })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(createTaskDto, req.user);
  }

  @ApiOkResponse({ type: Task, isArray: true })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Task[]> {
    return this.tasksService.findAll(req.user);
  }

  @ApiOkResponse({ type: Task})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @ApiOkResponse({ type: Task})
  @Put(':id')
  update(@Param('id') id: number, @Body() updateTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOkResponse({ type: Task})
  @Delete(':id')
  remove(@Param('id') id: number): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
