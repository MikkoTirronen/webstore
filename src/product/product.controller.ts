import {
  Body,
  Controller,
  Get,
  Post,
  Logger,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}
  private readonly logger = new Logger(ProductController.name);

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }
  @Get('products?')
  async find(
    @Query('sort') sort: string,
    @Query('limit') limit: number,
  ): Promise<Product[]> {
    console.log(sort, limit);
    return await this.productService.findAllWithQuery(sort, limit);
  }

  @Get('products/categories')
  async findCategories(): Promise<Product[]> {
    return await this.productService.findCategories();
  }

  @Get('products/:id')
  async findOne(@Param('id') id: number): Promise<Product | undefined | null> {
    this.logger.debug(`Searching for Todo with id: ${id}`);
    const product = await this.productService.findOne(id);

    this.logger.debug(`Found product: ${JSON.stringify(product)}`);

    if (!product) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return product;
  }
  @Get('products/category/:category?')
  async getCategory(
    @Param('category') category: string,
    @Query('sort') sort: string,
    @Query('limit') limit: number,
  ): Promise<Product[] | undefined> {
    const product = await this.productService.getCategory(
      category,
      sort,
      limit,
    );
    return product;
  }

  @Post()
  async create(@Body() product: Product) {
    this.logger.debug(`New Product ${JSON.stringify(product)}`);
    this.productService.create(product);
  }
}
