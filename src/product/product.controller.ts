import { Body, Controller, Get, Post, Logger, Param } from '@nestjs/common';
import { Product } from './product.interface';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  private readonly logger = new Logger(ProductController.name);
  @Get()
  findAll(): Product[] {
    return this.productService.findAll();
  }
}
