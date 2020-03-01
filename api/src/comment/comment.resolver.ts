import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Comment } from '../graphql.schema.generated';
import { GqlUser } from '../shared/decorators/decorators';
import { User } from '../../generated/prisma-client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { CommentInputDto } from './comment-input.dto';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveProperty()
  async author(@Parent() { id }: Comment) {
    return this.prisma.client.comment({ id }).author();
  }

  @ResolveProperty()
  async post(@Parent() { id }: Comment) {
    return this.prisma.client.comment({ id }).post();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createComment(
    @Args('commentInput') { postId, body }: CommentInputDto,
    @GqlUser() user: User,
  ) {
    return this.prisma.client.createComment({
      body,
      post: { connect: { id: postId } },
      author: { connect: { id: user.id } },
    });
  }
}
