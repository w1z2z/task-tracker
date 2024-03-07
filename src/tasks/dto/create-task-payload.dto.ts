import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskPayloadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty()
  @IsNotEmpty()
  deadline: Date;
}