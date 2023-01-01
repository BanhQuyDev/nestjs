import { TypeOrmExModule } from './typeorm/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { TaskRepository } from './tasks/task.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456789',
      database: 'task-management',
      entities: [__dirname + '/../**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
  ]
})
export class AppModule {}
