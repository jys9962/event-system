import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class DailyLoginTracker {

  constructor(
    private readonly redis: Redis,
  ) {}
  

}
