import { Injectable } from '@nestjs/common'
import { FollowerService } from 'src/follower/follower.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class PostService {
	constructor(
		private prisma: PrismaService,
		private followerService: FollowerService
	) {}

	getPosts() {
		return this.prisma.post.findMany()
	}

	getPostsByUserId(id: string) {
		return this.prisma.post.findMany({
			where: {
				authorId: id
			},
			include: {
				Like: {
					include: {
						user: true
					}
				},
				Comment: true,
				author: true
			}
		})
	}

	async getFeed(id: string) {
		const follows = await this.followerService.getFollows(id)

		return this.prisma.post.findMany({
			where: {
				authorId: {
					in: follows.map(follow => follow.userId)
				}
			},
			include: {
				Like: {
					include: {
						user: true
					}
				},
				Comment: true,
				author: true
			},
			orderBy: [
				{
					createdAt: 'desc'
				}
			]
		})
	}
}
