import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from 'src/prisma.service';
import { FollowerModule } from 'src/follower/follower.module';

@Module({
  imports: [FollowerModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
