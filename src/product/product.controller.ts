import { Controller, Get } from '@nestjs/common';
import { Product } from './product.interface';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  @Get()
  findAll(): string {
    return 'All my products...';
  }
}
