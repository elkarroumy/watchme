import Redis from 'ioredis';
import { redisOptions } from '../../../common/configs';

export class RedisStorage {
  private redis: Redis;

  public constructor() {
    this.redis = new Redis(redisOptions);
  }

  public async set(key: string, data: string, ttl: number) {
    await this.redis.set(key, data);
    return this.redis.expire(key, ttl);
  }

  public async get(key: string) {
    return await this.redis.get(key);
  }
}
