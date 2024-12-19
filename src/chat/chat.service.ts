import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { ChatDto } from './dto/chat.dto'

@Injectable()
export class ChatService {
	constructor(private prisma: PrismaService) {}

	async createChat(id: string, dto: ChatDto) {
		const userIds = [
			{
				id: id
			},
			{ id: dto.userId }
		]

		const chat = await this.prisma.chat.findFirst({
			where: {
				AND: [
					{
						users: {
							some: {
								id: userIds[0].id
							}
						}
					},
					{
						users: {
							some: {
								id: userIds[1].id
							}
						}
					}
				]
			},
			include: {
				users: true
			}
		})

		if (chat) return chat

		return this.prisma.chat.create({
			data: {
				users: {
					connect: userIds
				}
			}
		})
	}

	getChat(id: string) {
		return this.prisma.chat.findUnique({
			where: {
				id
			},
			include: {
				users: true,
				messages: true
			}
		})
	}

	getChats() {
		return this.prisma.chat.findMany()
	}

	getChatsByUserId(userId: string) {
		return this.prisma.chat.findMany({
			where: {
				users: {
					some: {
						id: userId
					}
				}
			},
			include: {
				users: true
			}
		})
	}

	async createMessage(data: Prisma.MessageCreateInput) {
		return this.prisma.message.create({
			data
		})
	}
}
