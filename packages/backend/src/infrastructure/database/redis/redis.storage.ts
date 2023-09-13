import Redis, { RedisOptions } from 'ioredis';

export class RedisStorage {
  private redis: Redis;

  public constructor(options: RedisOptions) {
    this.redis = new Redis(options);
  }

  public async set(key: string, data: string, ttl: number) {
    await this.redis.set(key, data);
    return this.redis.expire(key, ttl);
  }

  public async get(key: string) {
    return await this.redis.get(key);
  }
}
