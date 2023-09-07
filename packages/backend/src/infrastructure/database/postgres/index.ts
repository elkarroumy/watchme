import { Pool, QueryConfig } from 'pg';
import Statement from './statement';
import { PostgresOptions } from 'src/common/types/types';

const removePadding = (char: string) => {
  const chunks = char.split('\n').map((d) => d.trim());
  return chunks.join('\n');
};

export default class Database {
  private pool: Pool;

  public constructor(options: PostgresOptions) {
    this.pool = new Pool(options);
  }

  public async query(sql: string, values: string[]) {
    return this.pool.query(sql, values).catch((error) => {
      error.dbStack = error.stack;
      Error.captureStackTrace(error);
      throw error;
    });
  }

  public sql(strings: TemplateStringsArray, ...keys: any) {
    const chunks = [removePadding(strings[0].trim())];
    for (let i = 1; i <= keys.length; i++) {
      chunks.push('$' + i.toString(), removePadding(strings[i]));
    }
    const expression = chunks.join(' ');
    return new Statement(this, expression, keys);
  }
}
