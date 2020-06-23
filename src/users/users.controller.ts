import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Controller('/user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Post('/register')
  async register(@Body('user') user: CreateUserDto): Promise<User> {
    return await this.usersService.addUser(user);
  }

  @Post('/login')
  async login(
    @Param('userName') userName: string,
    @Param('password') password: string,
    @Session() session,
  ): Promise<User | string> {
    const user = await this.usersService.findOne(userName, password);
    if (user?.id) {
      session[Date.now()] = user.id;
    } else {
      return '用户名或密码错误';
    }
    console.log('user', user)
    return user;
  }
}
