import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatGateway } from './chat.gateway'
import { PrismaService } from 'src/prisma.service'
import { ChatController } from './chat.controller'

@Module({
	controllers: [ChatController],
	providers: [ChatGateway, ChatService, PrismaService]
})
export class ChatModule {}
