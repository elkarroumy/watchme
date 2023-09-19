import { User } from './dtos/auth.dto';

export interface Auth {
  create(data: User): Promise<User>;
}
