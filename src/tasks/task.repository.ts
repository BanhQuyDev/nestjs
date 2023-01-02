import { User } from './../auth/user.entity';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/typeorm/typeorm-ex.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@CustomRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createTask(task: CreateTaskDto, user: User): Promise<Task> {
    const { title, desc } = task;
    const entityTask = this.create({
      title,
      desc,
      status: TaskStatus.OPEN,
      user,
    });
    return await this.save(entityTask);
  }
  async getAll(filterDTO: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDTO;
    const query = this.createQueryBuilder('task');
    query.where({ user });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(LOWER(task.title) like LOWER(:search) or LOWER(task.desc) like LOWER(:search))',
        {
          search: `%${search}%`,
        },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
