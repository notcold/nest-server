import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import config from './config/config.base';
import { APP_PIPE } from '@nestjs/core';
import { SessionModule } from 'nestjs-session';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config,
      autoLoadEntities: true,
    } as TypeOrmModuleOptions),
    UsersModule,
    SessionModule.forRoot({
      session: { secret: 'keyboard' },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
