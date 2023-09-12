export interface RedisRepository {
  saveMovie(key: string, data: string, ttl: number);
  getMovie(key: string);
}
