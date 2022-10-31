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

  @Get(':id')
  findOne(@Param('id') id: number): Product | undefined {
    this.logger.debug(`Searching for Todo with id: ${id}`);
    const product = this.productService.findOne(id);
    this.logger.debug(`Found product: ${JSON.stringify(product)}`);
    return product;
  }

  @Post()
  create(@Body() product: Product) {
    this.logger.debug(`New Product ${JSON.stringify(product)}`);
    this.productService.create(product);
  }
}
