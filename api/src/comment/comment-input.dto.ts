import { CommentInput } from 'src/graphql.schema.generated';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CommentInputDto extends CommentInput {
  @IsString()
  readonly postId: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  readonly body: string;
}
