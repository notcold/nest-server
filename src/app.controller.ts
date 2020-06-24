import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor() {}
  @Get('/health')
  checkService(): string {
    console.log('health');
    return '123';
  }
}
