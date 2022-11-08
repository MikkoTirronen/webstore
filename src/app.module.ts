import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { Product, ProductSchema } from './product/product.schema';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
