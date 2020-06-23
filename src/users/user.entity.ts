import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName?: string;

  @Column()
  userName: string;


  @Column({ default: true })
  isActive: boolean;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
