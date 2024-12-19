import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class LikeService {
	constructor(private prisma: PrismaService) {}

	getLike(userId: string, postId: string) {
		return this.prisma.like.findFirst({
			where: {
				userId: userId,
				postId: postId
			}
		})
	}

	async create(userId: string, postId: string) {
		return this.prisma.like.create({
			data: {
				userId: userId,
				postId: postId
			}
		})
	}

	async delete(userId: string, postId: string) {

        const like = await this.getLike(userId, postId)

		return this.prisma.like.delete({
			where: {
				id: like.id
			}
		})
	}
}
