import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  rating: string;
}
