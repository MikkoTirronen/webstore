import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.model';

export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}
  async createUser(
    username: string,
    password: string,
    name: string,
    telephone: number,
    address: string,
    tempCart?: Array<CartItem>,
  ): Promise<User> {
    return this.userModel.create({
      username,
      password,
      name,
      telephone,
      address,
      tempCart,
    });
  }
  async getUser(query: object): Promise<User | null> {
    return this.userModel.findOne(query);
  }
}
