import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { User } from './user.entity';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  readonly nickName?: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  readonly isActive: 0 | 1;

  convertToEntity(): User {
    const user = new User();
    user.userName = this.userName;
    user.nickName = this.nickName;
    user.password = this.password;
    user.isActive = this.isActive;
    return user;
  }
}
