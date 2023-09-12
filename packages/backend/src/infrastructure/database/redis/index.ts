import Redis from 'ioredis';
import { redisOptions } from '../../../common/configs';

export class RedisCache {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(redisOptions);
  }

  public async setData(key: string, data: string, ttl: number) {
    await this.redis.set(key, data);
    return this.redis.expire(key, ttl);
  }

  public async getData(key: string) {
    return this.redis.get(key);
  }
}
