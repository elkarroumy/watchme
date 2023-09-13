import { Injectable } from '@nestjs/common';
import { Redis } from '../../../core/repositories/redis.repository';
import { RedisStorage } from '../redis/redis.storage';

@Injectable()
export default class RedisRepository implements Redis {
  public constructor(private readonly redisStorage: RedisStorage) {}

  public async set(key: string, data: string, ttl: number) {
    return await this.redisStorage.set(key, data, ttl);
  }

  public async get(key: string) {
    return await this.redisStorage.get(key);
  }
}
