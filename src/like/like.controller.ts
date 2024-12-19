import { Controller, HttpCode, Param, Post } from '@nestjs/common'
import { LikeService } from './like.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'

@Controller('like')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@HttpCode(200)
	@Post('/create/:id')
	@Auth()
	async createLike(@CurrentUser('id') id: string, @Param('id') postId: string) {
		return this.likeService.create(id, postId)
	}

	@HttpCode(200)
	@Post('/delete/:id')
	@Auth()
	async deleteLike(@CurrentUser('id') id: string, @Param('id') postId: string) {
		return this.likeService.delete(id, postId)
	}
}
