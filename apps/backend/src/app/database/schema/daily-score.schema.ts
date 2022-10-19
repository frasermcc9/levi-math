import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class DailyScore {
  @Prop({ required: true, type: Date })
  date: Date;

  @Prop({ required: false, type: Number })
  ms?: number;

  @Prop({ required: true, type: String })
  userFirebaseId: string;

  constructor(score: DailyScore) {
    return Object.assign(this, score);
  }
}

export type DailyScoreDocument = DailyScore & Document;
export type DailyScoreCollection = Model<DailyScoreDocument>;

export const DailyScoreSchema = SchemaFactory.createForClass(DailyScore);
