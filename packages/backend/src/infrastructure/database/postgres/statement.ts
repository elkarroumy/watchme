import Database from './index';

export default class Statement {
  public constructor(
    private db: Database,
    private sql: string,
    private keys: string[]
  ) {
    this.db = db;
    this.sql = sql;
    this.keys = keys;
  }

  public async rows(params = {}): Promise<string[]> {
    const names = Object.getOwnPropertyNames(params);
    const args = [];
    for (const key of this.keys) {
      const value = names.includes(key) ? Reflect.get(params, key) : key;
      args.push(value);
    }
    const { rows } = await this.db.query(this.sql, args);
    return rows;
  }

  public async row(params = {}): Promise<string> {
    const rows = await this.rows(params);
    if (rows.length < 1) return null;
    return rows[0];
  }

  public async scalar(params = {}): Promise<string> {
    const row = await this.row(params);
    const values = Object.values(row);
    return values[0];
  }
}
