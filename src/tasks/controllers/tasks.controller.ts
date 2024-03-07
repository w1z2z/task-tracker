import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { TasksService } from '../services/tasks.service';
import { CreateTaskPayloadDto } from '../dto/create-task-payload.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { AuthResponseDto } from '../../auth/dto/auth-response.dto';
import { TaskResponseDto } from '../dto/task-response.dto';
import { TaskBaseDto } from '../dto/task-base.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {
  }

  @ApiOperation({ summary: 'Создать новость' })
  @ApiCreatedResponse({
    type: TaskResponseDto,
    description: 'Новая новость',
  })
  @ApiBody({ type: CreateTaskPayloadDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Req() req: { user: AuthResponseDto },
    @Body() payload: CreateTaskPayloadDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.createTask(req.user.id, payload);
  }

  @ApiOperation({ summary: 'Получить все задачи' })
  @ApiCreatedResponse({
    type: [TaskBaseDto],
    description: 'Список задач',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllTasks(
    @Req() req: { user: AuthResponseDto },
  ): Promise<TaskBaseDto[]> {
    return this.tasksService.getTasksByUserId(req.user.id);
  }

  @ApiOperation({ summary: 'Получить задачу по id' })
  @ApiCreatedResponse({
    type: TaskBaseDto,
    description: 'Выбранная задача',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Param('id') id: string): Promise<TaskBaseDto> {
    return this.tasksService.getTaskById(id);
  }

  @ApiOperation({ summary: 'Удалить задачу по id' })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @Param('id') id: string,
    @Req() req: { user: AuthResponseDto },
  ): Promise<void> {
    return this.tasksService.deleteTask(req.user.id, id);
  }

  @ApiOperation({ summary: 'Изменить задачу' })
  @ApiCreatedResponse({
    type: TaskBaseDto,
    description: 'Измененная задача',
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Param('id') id: string,
    @Req() req: { user: AuthResponseDto },
    @Body() payload: CreateTaskPayloadDto,
  ): Promise<any> {
    return this.tasksService.updateTask(req.user.id, id, payload);
  }
}
