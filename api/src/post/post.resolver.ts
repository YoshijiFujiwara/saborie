import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { Post, Comment } from '../graphql.schema.generated';
import { GqlUser } from '../shared/decorators/decorators';
import { User } from '../../generated/prisma-client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/graphql-auth.guard';
import { PostInputDto } from './post-input.dto';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query()
  async post(@Args('id') id: string) {
    return this.prisma.client.post({ id });
  }

  @Query()
  async posts() {
    return this.prisma.client.posts();
  }

  @ResolveProperty()
  async author(@Parent() { id }: Post) {
    return this.prisma.client.post({ id }).author();
  }
  @ResolveProperty()
  async comments(@Parent() { id }: Post) {
    return this.prisma.client.post({ id }).comments();
  }
  @ResolveProperty()
  async likes(@Parent() { id }: Post) {
    return this.prisma.client.post({ id }).likes();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async createPost(
    @Args('postInput') { todo, mistake, minutes, excuse }: PostInputDto,
    @GqlUser() user: User,
  ) {
    return this.prisma.client.createPost({
      todo,
      mistake,
      minutes,
      excuse,
      author: { connect: { id: user.id } },
    });
  }
}
