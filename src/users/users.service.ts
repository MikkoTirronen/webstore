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
  async updateCart(_id: string, cartData: any) {
    console.log('HERE is the TempCart', cartData);
    const myData: any = [];

    for (const key in cartData) {
      myData.push(cartData[key]);
    }
    console.log('Here is the new array', myData[0]);
    const replaceDate = await this.userModel
      .findByIdAndUpdate(
        { _id: '636dbd6908dfc2da92e66ed1' },
        {
          tempCart: myData[0],
        },
        {
          overwrite: true,
          new: true,
        },
      )
      .exec();
    return replaceDate;
  }
}
