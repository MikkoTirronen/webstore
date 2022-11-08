import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.model';
import { LocalStrategy } from './strategies/local.auth';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60s' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
