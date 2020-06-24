import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user_entity')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  nickName?: string;

  @Column()
  userName: string;

  @Column({ default: 0 })
  isActive: 0 | 1;

  @Exclude()
  @Column()
  password: string;

  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
}
