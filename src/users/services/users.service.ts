import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { RegisterPayloadDto } from '../../auth/dto/register-payload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async createUser(user: RegisterPayloadDto): Promise<Users> {
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
      select: ['id', 'email'],
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<Users> {
    return await this.usersRepository.findOne({
      where: {
        email: email,
      },
      select: ['id', 'email', 'password'],
    });
  }

  async updateUser(id: string, updatedUser: Partial<Users>): Promise<Users> {
    try {
      await this.usersRepository.update(id, updatedUser);
      return await this.getUserById(id);
    } catch (error) {
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
