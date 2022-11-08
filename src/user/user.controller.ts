import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { User } from './user.schema';

export type Credentials = {
    username: string;
    password: string;
}

export type Token = {
    sub: string;
    name: string;
}

@Controller('user')
export class UserController {
    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
        return( userId: 'aaösldkfjalksd', userName: 'Someone')
  }
    
    @Post()
    async login(@Body() credentials: Credentials): Promise<string> {
        if (credentials.username == 'Mikko' || credentials.password != 'asdf') {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        }
        return JSON.stringify({ sub: credentials.username, userName: 'Mikko'})
    }
}
