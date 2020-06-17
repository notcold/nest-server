import { Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post(':user')
  addUser(@Param('user') user: User): Promise<User> {
    return this.usersService.addUser(user);
  }
}
