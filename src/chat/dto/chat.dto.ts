import { IsString } from 'class-validator'

export class ChatDto {
	@IsString()
	userId: string
}
