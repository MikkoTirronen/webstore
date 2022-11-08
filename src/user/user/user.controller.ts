import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.schema';

@Controller('user')
export class UserController {
    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<User> {
        return( _userId: 'aaösldkfjalksd')
  }
}
