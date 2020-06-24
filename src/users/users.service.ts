import { Injectable, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    console.log('user', user);
    return user;
  }

  async addUser(user: CreateUserDto): Promise<User> {
    const userEntity = user.convertToEntity();
    const result = this.userRepository.save(userEntity);
    console.log('result', result);
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
    const result = await this.userRepository.findOne({
      where: {
        userName,
        password,
      },
    });
    return result;
  }
}
