import { Column, Entity, ManyToOne } from 'typeorm';

import { Users } from '../../users/entities/users.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { TaskStatus } from '../enums/task-status.enum';

@Entity()
export class Tasks extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  deadline: Date;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;

  @ManyToOne(() => Users, (users) => users.tasks)
  user: Users;
}
