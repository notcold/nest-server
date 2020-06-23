import { Injectable, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection } from 'typeorm';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async addUser(user: CreateUserDto): Promise<User> {
    const result = await this.userRepository.create(user);
    return result;
  }

  async updateUser(user: CreateUserDto): Promise<boolean> {
    const result = await this.userRepository.update('', user);
    return result.affected === 1;
  }

  async delUser(id: string): Promise<boolean> {
    let flag = true;
    this.connection.transaction(async manage => {
      try {
        await manage.delete(id, null);
      } catch (error) {
        flag = false;
      }
    });
    return flag;
  }

  async findOne(userName: string, password: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        userName,
        password,
      },
    });
  }
}
