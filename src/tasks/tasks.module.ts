import { TypeOrmExModule } from './../typeorm/typeorm-ex.module';
import { TaskRepository } from './task.repository'; 
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([TaskRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
