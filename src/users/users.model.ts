import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/product/product.schema';
import { CartItem } from './users.service';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  telephone: number;

  @Prop()
  address: string;

  @Prop()
  tempCart?: Array<CartItem>;
}

export const UserSchema = SchemaFactory.createForClass(User);
