import { TypeOrmExModule } from './../typeorm/typeorm-ex.module';
import { TaskRepository } from './task.repository'; 
import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
    TypeOrmExModule.forCustomRepository([TaskRepository]),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
