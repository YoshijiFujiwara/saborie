import { Module } from '@nestjs/common';
import { LikeResolver } from './like.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [LikeResolver],
  imports: [PrismaModule],
})
export class LikeModule {}
