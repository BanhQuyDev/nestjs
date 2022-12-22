import { TasksService } from './tasks.service';
import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTask() {
    return this.taskService.getAllTask();
  }
}
