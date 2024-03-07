import { ApiProperty } from '@nestjs/swagger';

import { UserResponseDto } from '../../users/dto/user-response.dto';
import { TaskBaseDto } from './task-base.dto';

export class TaskResponseDto extends TaskBaseDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  user: UserResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}