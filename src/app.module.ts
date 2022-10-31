import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { Product, ProductSchema } from './product/product.schema';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/myproducts'),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
