import {
  Body,
  Controller,
  Get,
  Post,
  Logger,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  private readonly logger = new Logger(ProductController.name);
  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product | undefined | null> {
    this.logger.debug(`Searching for Todo with id: ${id}`);
    const product = this.productService.findOne(id);
    if (!product) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    } else {
      this.logger.debug(`Found product: ${JSON.stringify(product)}`);
      return product;
    }
  }

  @Post()
  create(@Body() product: Product) {
    this.logger.debug(`New Product ${JSON.stringify(product)}`);
    this.productService.create(product);
  }
}
