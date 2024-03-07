import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from '../users/services/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
