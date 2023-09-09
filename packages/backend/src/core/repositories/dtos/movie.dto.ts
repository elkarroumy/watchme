import { MovieLists } from "../../../common/types/types";


export class Movie {
  addedAt: Date;
  title: string;
  overview: string;
  releaseDate: Date;
  time: number;
  country: string;
  authors: string;
  genre: string;
  ageRate: number;
  originalLanguage: string;
  budget: bigint | number;
  revenue: bigint | number;
}

export class MovieParams {
  lists: MovieLists;
  language: string;
  page: number;
}
