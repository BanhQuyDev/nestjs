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
  async getTaskFilter(filterDTO: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getAll(filterDTO);
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(task);
  }
  async getDetailTask(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with Id "${id}"`);
    }
    return found;
  }
  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  async updateStatusTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getDetailTask(id);
    task.status = status;
    this.tasksRepository.save(task);
    return task;
  }
}
