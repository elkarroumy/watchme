export interface MovieList {
  now_playing: string;
  popular: string;
  top_rated: string;
  upcoming: string;
}

export interface ServerResponse {
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

export type JwtPayload = {
  sub: string;
  email: string;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};


