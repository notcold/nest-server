import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Session,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.getUser(id);
  }

  @Post('/register')
  async register(@Body() user: CreateUserDto): Promise<User> {
    console.log('user', user.userName);
    return await this.usersService.addUser(user);
  }

  @Post('/login')
  async login(
    @Body('userName') userName: string,
    @Body('password') password: string,
    @Session() session,
  ): Promise<User | string> {
    console.log('session ', session);
    const user = await this.usersService.findOne(userName, password);
    if (user?.id) {
      session[Date.now()] = user.id;
    } else {
      return '用户名或密码错误';
    }
    return user;
  }
}
