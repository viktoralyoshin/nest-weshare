import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/:username')
	@Auth()
	async getProfile(@Param('username') username: string) {
		return await this.userService.getProfile(username)
	}

  @Get('/users/all')
  async getUsers(){
    return await this.userService.getAllUsers()
  }

  @Get('/')
  @Auth()
  async getCurrentProfile(@CurrentUser('username') username: string) {
    return await this.userService.getProfile(username)
  }
}
