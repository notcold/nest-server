import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: number;

  @IsBoolean()
  readonly isActive: string;
}
