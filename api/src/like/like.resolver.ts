import {
  Resolver,
  Mutation,
  Args,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/graphql-auth.guard';
import { GqlUser } from 'src/shared/decorators/decorators';
import { User } from '../../generated/prisma-client';
import { LikeInputDto } from './like-input.dto';
import { Like } from 'src/graphql.schema.generated';

@Resolver('Like')
export class LikeResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveProperty()
  async author(@Parent() { id }: Like) {
    return this.prisma.client.like({ id }).author();
  }
  @ResolveProperty()
  async post(@Parent() { id }: Like) {
    return this.prisma.client.like({ id }).post();
  }

  @Mutation()
  @UseGuards(GqlAuthGuard)
  async switchLike(
    @Args('likeInput') { postId }: LikeInputDto,
    @GqlUser() user: User,
  ) {
    // 本来は１件までにすべきであるが
    const likes = await this.prisma.client.likes({
      where: { post: { id: postId }, author: { id: user.id } },
    });
    if (likes.length > 0) {
      const likeIds = likes.map(like => like.id);
      likeIds.forEach(async likeId => {
        await this.prisma.client.deleteLike({
          id: likeId,
        });
      });
      return null;
    } else {
      return this.prisma.client.createLike({
        post: { connect: { id: postId } },
        author: { connect: { id: user.id } },
      });
    }
  }
}
