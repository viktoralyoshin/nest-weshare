import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ChatService } from './chat.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { ChatDto } from './dto/chat.dto'

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Get('/:id')
	@Auth()
	async getChat(@Param('id') id: string) {
		return await this.chatService.getChat(id)
	}

	@HttpCode(200)
	@Post('/')
	@Auth()
	async createChat(@CurrentUser('id') id: string, @Body() dto: ChatDto) {
		return await this.chatService.createChat(id, dto)
	}

    @Get('/')
    async getChats(){
        return await this.chatService.getChats()
    }

	@Get('/user/chats')
    @Auth()
	async getByUserId(@CurrentUser('id') id: string) {
		return await this.chatService.getChatsByUserId(id)
	}
}
