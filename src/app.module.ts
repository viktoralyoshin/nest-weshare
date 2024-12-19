import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { FollowerModule } from './follower/follower.module';
import { PostModule } from './post/post.module';
import { LikeModule } from './like/like.module';

@Module({
	imports: [ConfigModule.forRoot(), AuthModule, UserModule, ChatModule, FollowerModule, PostModule, LikeModule]
})
export class AppModule {}
