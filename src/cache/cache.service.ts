import { Injectable, Global } from '@nestjs/common';

@Global()
@Injectable()
export class CacheService {
  cache: { [key: string]: any } = {};

  get(key: string): any {
    return this.cache[key];
  }

  set(key, value) {
    this.cache[key] = value;
  }
}
