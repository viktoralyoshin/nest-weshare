import { IsString } from 'class-validator'

export class FollowerDto {
    @IsString()
    followerId: string
}
