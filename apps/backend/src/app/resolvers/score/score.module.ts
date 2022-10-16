import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Score, ScoreSchema } from '../../database/schema/score.schema';
import { ScoreResolver } from './score.resolver';
import { ScoreService } from './score.service';

@Module({
  providers: [ScoreResolver, ScoreService],
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
})
export class ScoreModule {}
