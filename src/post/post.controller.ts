import { Controller, Get, Param } from '@nestjs/common'
import { PostService } from './post.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get('/all')
	async getAllPosts(){
	  return this.postService.getPosts()
	}

	@Get('/posts/:id')
	@Auth()
	async getByUserId(@Param('id') userId: string) {
		return this.postService.getPostsByUserId(userId)
	}

	@Get('/feed')
	@Auth()
	async getFeed(@CurrentUser('id') id: string) {
		return this.postService.getFeed(id)
	}
}
