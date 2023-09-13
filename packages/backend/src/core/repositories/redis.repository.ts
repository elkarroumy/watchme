export interface Redis {
  set(key: string, data: string, ttl: number);
  get(key: string);
}
