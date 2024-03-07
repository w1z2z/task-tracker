import { Column, Entity, OneToMany } from 'typeorm';

import { Tasks } from '../../tasks/entities/tasks.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Users extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Tasks, (task) => task.user)
  tasks: Tasks[];
}
