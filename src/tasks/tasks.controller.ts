import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Controller, Get, Query } from '@nestjs/common';
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
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getTask(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTaskFilter(filterDto);
  }
  @Get(':id')
  getDetailTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getDetailTask(id);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }
  @Post()
  @HttpCode(201)
  createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateStatusTask: UpdateStatusDto,
  ): Promise<Task> {
    const { status } = updateStatusTask;
    return this.taskService.updateStatusTask(id, status);
  }
}
