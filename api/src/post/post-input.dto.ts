import {
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { PostInput } from '../graphql.schema.generated';

export class PostInputDto extends PostInput {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly todo: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  readonly mistake: string;

  @IsNumber()
  @Min(15)
  @Max(60 * 24)
  readonly minutes: number;

  @IsString()
  readonly excuse: string;
}
