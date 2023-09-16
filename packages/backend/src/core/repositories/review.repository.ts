import { Review } from './dtos/review.dto';

export interface Reviews {
  create(data: Review): Promise<Review>;
  find(): Promise<Review[]>;
  update(id: string, data: Review): Promise<Review>;
  delete(id: string): Promise<Review>;
}
