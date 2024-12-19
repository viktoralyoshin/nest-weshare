import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FollowerService } from './follower.service'
import { FollowerDto } from './dto/follower.dto'

@Controller('follower')
export class FollowerController {
	constructor(private readonly followerService: FollowerService) {}

    @Get('/')
    @Auth()
    async getFollows(@CurrentUser('id') id: string){
        return this.followerService.getFollows(id)
    }

    @Get('/all')
    async getAllFollowers(){
        return this.followerService.getAllFollowers()
    }

    @HttpCode(200)
	@Post('/')
    @Auth()
    async follow(@CurrentUser('id') id: string, @Body() dto: FollowerDto){
        return await this.followerService.create(dto, id)
    }

	@HttpCode(200)
	@Post('/unfollow')
    @Auth()
    async unFollow(@CurrentUser('id') id: string, @Body() dto: FollowerDto){
        return await this.followerService.delete(dto, id)
    }
}
