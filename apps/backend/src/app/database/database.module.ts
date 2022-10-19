import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyScore, DailyScoreSchema } from './schema/daily-score.schema';
import { Score, ScoreSchema } from './schema/score.schema';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: DailyScore.name, schema: DailyScoreSchema },
    ]),
  ],
})
export class DatabaseModule {}
