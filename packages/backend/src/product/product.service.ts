import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async findOne(id: number): Promise<Product | undefined | null> {
    return this.productModel.findOne({ id: id }).exec();
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async findCategories(): Promise<Product[]> {
    return this.productModel.find().distinct('category').exec();
  }
  async getCategory(
    category: string,
    sort: string,
    limit: number,
  ): Promise<Product[]> {
    if (sort == 'desc') {
      return this.productModel
        .find()
        .where({ category: category })
        .limit(limit)
        .sort({ title: 1 })
        .exec();
    } else {
      return this.productModel
        .find()
        .where({ category: category })
        .limit(limit)
        .sort({ title: -1 })
        .exec();
    }
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
  async findAllWithQuery(sort: string, limit: number): Promise<Product[]> {
    if (sort == 'desc') {
      return this.productModel.find().sort({ title: 1 }).limit(limit).exec();
    } else {
      return this.productModel.find().sort({ title: -1 }).limit(limit).exec();
    }
  }
}
