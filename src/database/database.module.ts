import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { DatabaseConfiguration } from '../common/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: undefined,
      useClass: DatabaseConfiguration,
    }),
  ],
})
export class DatabaseModule {}
