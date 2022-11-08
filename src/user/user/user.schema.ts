import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class User {
  @Prop()
  userId: string;

  @Prop()
  userName: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
