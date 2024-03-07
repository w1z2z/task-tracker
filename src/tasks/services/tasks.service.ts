import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tasks } from '../entities/tasks.entity';
import { UsersService } from '../../users/services/users.service';
import { CreateTaskPayloadDto } from '../dto/create-task-payload.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { TaskBaseDto } from '../dto/task-base.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private tasksRepository: Repository<Tasks>,
    private usersService: UsersService,
  ) {}

  async createTask(userId: string, task: CreateTaskPayloadDto): Promise<Tasks> {
    const user = await this.usersService.getUserById(userId);
    try {
      const newTask = new Tasks();
      newTask.title = task.title;
      newTask.description = task.description;
      newTask.deadline = task.deadline;
      newTask.status = TaskStatus.OPEN;
      newTask.user = user;
      return await this.tasksRepository.save(newTask);
    } catch (error) {
      throw new HttpException(
        'Failed to create task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTaskById(id: string): Promise<TaskBaseDto> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async updateTask(
    userId: string,
    id: string,
    updatedTask: CreateTaskPayloadDto,
  ): Promise<any> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
    }
    if (task.user.id !== userId) {
      throw new HttpException(
        'No permission to delete task!',
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      await this.tasksRepository.update(id, updatedTask);
      return this.getTaskById(id);
    } catch (error) {
      throw new HttpException(
        'Failed to update task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTask(userId: string, id: string): Promise<void> {
    const task = await this.tasksRepository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });

    if (!task) {
      throw new HttpException('Task not found!', HttpStatus.NOT_FOUND);
    }
    if (task.user.id !== userId) {
      throw new HttpException(
        'No permission to delete task!',
        HttpStatus.FORBIDDEN,
      );
    }

    try {
      await this.tasksRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTasksByUserId(userId: string): Promise<TaskBaseDto[]> {
    const tasks = await this.tasksRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      select: ['id', 'title', 'deadline'],
    });
    if (!tasks) {
      throw new HttpException(
        'No tasks found for the user',
        HttpStatus.NOT_FOUND,
      );
    }
    return tasks;
  }
}
