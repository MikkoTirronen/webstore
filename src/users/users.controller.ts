import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartItem, UsersService } from './users.service';
import { User } from './users.model';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);
  @Post('/signup')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('telephone') telephone: number,
    @Body('address') address: string,
    @Body('tempCart') tempCart: Array<CartItem>,
  ): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      name,
      telephone,
      address,
      tempCart,
    );
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/infom')
  getInformation(@Req() req: any) {
    return req.user;
  }
}
