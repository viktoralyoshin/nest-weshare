import { Injectable } from '@nestjs/common'
import { hash } from 'argon2'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { FollowerService } from 'src/follower/follower.service'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(
		private prisma: PrismaService,
		private followerService: FollowerService
	) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	getByUsername(username: string) {
		return this.prisma.user.findUnique({
			where: {
				username
			},
			include: {
				followers: true,
				posts: {
					include: {
						Like: true,
						Comment: true,
						author: true
					}
				}
			}
		})
	}

	getAllUsers() {
		return this.prisma.user.findMany()
	}

	async create(dto: AuthDto) {
		const user = {
			username: dto.username,
			displayName: dto.username,
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}

	async getProfile(username: string) {
		const profile = await this.getByUsername(username)

		const follows = await this.followerService.getFollows(profile.id)

		const totalFollowers = profile.followers.length
		const totalFollows = follows.length

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, followers, ...user } = profile

		return {
			user,
			statistics: [
				{
					label: 'Подписчики',
					value: totalFollowers
				},
				{
					label: 'Подписок',
					value: totalFollows
				}
			]
		}
	}
}
