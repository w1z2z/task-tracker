import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { Users } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
})
export class UsersModule {}
