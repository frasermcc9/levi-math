import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Schema()
export class Score {
  @Prop({ required: true, type: Number })
  score: number;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Date })
  date: Date;

  constructor(score: Score) {
    return Object.assign(this, score);
  }
}

export type ScoreDocument = Score & Document;
export type ScoreCollection = Model<ScoreDocument>;

export const ScoreSchema = SchemaFactory.createForClass(Score);
