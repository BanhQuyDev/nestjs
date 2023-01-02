import { User } from './../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  HttpCode,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common/decorators';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Task } from './task.entity';
import { GetUser } from 'src/auth/get-user.decorator';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTask(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTaskFilter(filterDto, user);
  }
  @Get(':id')
  getDetailTask(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getDetailTask(id, user);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.taskService.deleteTask(id,user);
  }
  @Post()
  @HttpCode(201)
  createTask(
    @Body() task: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(task, user);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateStatusTask: UpdateStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateStatusTask;
    return this.taskService.updateStatusTask(id, status, user);
  }
}
