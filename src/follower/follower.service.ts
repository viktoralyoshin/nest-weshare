import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FollowerDto } from './dto/follower.dto'

@Injectable()
export class FollowerService {
	constructor(private prisma: PrismaService) {}

	getFollows(id: string) {
		return this.prisma.follower.findMany({
			where: {
				followerId: id
			}
		})
	}

    getAllFollowers(){
        return this.prisma.follower.findMany()
    }

	create(dto: FollowerDto, userId: string) {
		return this.prisma.follower.create({
			data: {
				userId: dto.followerId,
				followerId: userId
			}
		})
	}

    async delete(dto: FollowerDto, userId: string){

        const follower = await this.prisma.follower.findFirst({
            where: {
                userId: userId,
                followerId: dto.followerId
            }
        })

        return this.prisma.follower.delete({
            where: {
                id: follower.id
            }
        })
    }
}
