import { CommentInput } from 'src/graphql.schema.generated';
import { IsString } from 'class-validator';

export class LikeInputDto extends CommentInput {
  @IsString()
  readonly postId: string;
}
