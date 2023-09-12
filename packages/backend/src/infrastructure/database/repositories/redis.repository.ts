import { RedisRepository } from '../../../core/repositories/redis.repository';
import { RedisCache } from '../redis';

export default class Redis implements RedisRepository {
  public constructor(private readonly redisCache: RedisCache) {}

  public async saveMovie(key: string, data: string, ttl: number) {
    return await this.redisCache.setData(key, data, ttl);
  }

  public async getMovie(key: string) {
    return await this.redisCache.getData(key);
  }
}
