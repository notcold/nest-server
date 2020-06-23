import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  
  @IsString()
  readonly nickName: string;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly password: string;

  @IsBoolean()
  readonly isActive: boolean;
}
