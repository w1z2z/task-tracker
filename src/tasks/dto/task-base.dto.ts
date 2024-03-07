import { ApiProperty } from '@nestjs/swagger';

export class TaskBaseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  deadline: Date;
}