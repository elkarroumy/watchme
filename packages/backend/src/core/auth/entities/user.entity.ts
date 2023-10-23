import { UserDto } from './dtos/auth.dto';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  reviewId: string;
  movieId: string;
}

export interface UserMethods {
  create(data: UserDto): Promise<User>;
  find(email: string): Promise<User>;
  updateToken(id: string, token: string): Promise<User>;
}
