import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Connection } from 'typeorm';

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

  async addUser(user: User): Promise<User> {
    const result = await this.userRepository.create(user);
    return result;
  }
  // async delUser(id: string): Promise<string> {
  //   this.connection.transaction(async(manage)=>{
  //     const result = await this.userRepository.delete(id,manage);
  //     return result;
  //   })
    
  // }
}
