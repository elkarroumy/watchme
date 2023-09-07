export interface MovieLists {
  now_playing: string;
  popular: string;
  top_rated: string;
  upcoming: string;
}

export interface MovieResponse {
  status: number;
  message: string;
  data: any;
  error: { [key: string]: any };
}

export interface PostgresOptions {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}