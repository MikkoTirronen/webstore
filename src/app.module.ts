import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ProductService } from './product/product.service';

@Module({
  imports: [ProductModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule {}
