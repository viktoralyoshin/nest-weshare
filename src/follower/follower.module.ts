import { Module } from '@nestjs/common'
import { FollowerService } from './follower.service'
import { PrismaService } from 'src/prisma.service'
import { FollowerController } from './follower.controller'

@Module({
	controllers: [FollowerController],
	providers: [FollowerService, PrismaService],
	exports: [FollowerService]
})
export class FollowerModule {}
