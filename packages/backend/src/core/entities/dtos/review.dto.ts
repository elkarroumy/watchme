import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  rating: string;
}
