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
