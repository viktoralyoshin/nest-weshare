import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { ChatService } from './chat.service'
import { Server, Socket } from 'socket.io'
import { Prisma } from '@prisma/client'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
	cors: {
		origin: '*'
	}
})
export class ChatGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private readonly chatService: ChatService) {}

	private logger = new Logger(ChatGateway.name)

	@WebSocketServer() server: Server
	@SubscribeMessage('sendMessage')
	async handleSendMessage(client: Socket, payload: Prisma.MessageCreateInput) {
		await this.chatService.createMessage(payload)
	}

	afterInit() {
		this.logger.log('Initialized')
	}

	handleConnection(client: Socket) {
		const { sockets } = this.server.sockets

		this.logger.log(`Client id: ${client.id} connected`)
		this.logger.debug(`Number of connected clients: ${sockets.size}`)
	}

	handleDisconnect(client: Socket) {
		const { sockets } = this.server.sockets

		this.logger.log(`Disconnected ${client.id}`)
		this.logger.debug(`Number of connected clients: ${sockets.size}`)
	}
}
