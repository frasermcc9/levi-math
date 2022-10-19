import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, type: String, unique: true })
  firebaseId: string;

  @Prop({ required: true, type: String })
  username: string;

  constructor(score: User) {
    return Object.assign(this, score);
  }
}

export type UserDocument = User & Document;
export type UserCollection = Model<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(User);
