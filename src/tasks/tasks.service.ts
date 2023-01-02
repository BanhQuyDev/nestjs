import { User } from './../auth/user.entity';
import { TaskRepository } from './task.repository';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}
  async getTaskFilter(
    filterDTO: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getAll(filterDTO, user);
  }

  async createTask(task: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(task, user);
  }
  async getDetailTask(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) {
      throw new NotFoundException(`Task with Id "${id}"`);
    }
    return found;
  }
  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  async updateStatusTask(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getDetailTask(id, user);
    task.status = status;
    this.tasksRepository.save(task);
    return task;
  }
}
