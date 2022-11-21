import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from 'src/users/users.module';
import { UserSchema } from 'src/users/users.model';
import { LocalStrategy } from './strategies/local.auth';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
  ],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

// imports: [
//     ConfigModule.forRoot({
//       envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
//       load: [redisConfig],
//       cache: true,
//       isGlobal: true,
//     }),
//     UserModule,
//     PassportModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secretOrPrivateKey: configService.get<string>('JWT_SECRET_KEY'),
//         signOptions: {
//           expiresIn: 3600,
//         },
//       }),
//       inject: [ConfigService],
//     }),
