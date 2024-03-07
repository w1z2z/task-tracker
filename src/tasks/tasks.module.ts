import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './services/tasks.service';
import { TasksController } from './controllers/tasks.controller';
import { Tasks } from './entities/tasks.entity';
import { UsersService } from '../users/services/users.service';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks, Users])],
  controllers: [TasksController],
  providers: [TasksService, UsersService],
})
export class TasksModule {}
