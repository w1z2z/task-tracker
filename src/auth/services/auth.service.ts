import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { RegisterPayloadDto } from '../dto/register-payload.dto';
import { UsersService } from '../../users/services/users.service';
import { RegisterResponseDto } from '../dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser({ email, password }: RegisterPayloadDto): Promise<string> {
    const findUser = await this.usersService.getUserByEmail(email);
    if (!findUser) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid password!', HttpStatus.UNAUTHORIZED);
    }
    const user = { id: findUser.id, email: findUser.email };
    return this.jwtService.sign(user);
  }

  async register({
    email,
    password,
  }: RegisterPayloadDto): Promise<RegisterResponseDto> {
    const findUser = await this.usersService.getUserByEmail(email);
    if (findUser) {
      throw new HttpException(
        'User with this email already exists!',
        HttpStatus.CONFLICT,
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.usersService.createUser({
      email,
      password: hashedPassword,
    });

    return { id: user.id, email: user.email };
  }
}
