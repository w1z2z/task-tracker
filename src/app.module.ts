import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    TasksModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
