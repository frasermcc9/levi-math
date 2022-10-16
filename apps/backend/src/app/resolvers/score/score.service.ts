import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Score, ScoreCollection } from '../../database/schema/score.schema';
import { DateTime } from 'luxon';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: ScoreCollection
  ) {}

  async createScore(score: Pick<Score, 'name' | 'score'>) {
    const createdScore = new Score({ ...score, date: new Date() });

    return await this.scoreModel.create(createdScore);
  }

  async getTopScores(count: number) {
    const scores = await this.scoreModel.find(
      {},
      {},
      { limit: count, sort: { score: -1 } }
    );

    return scores.map((score) => ({
      id: score._id,
      score: score.score,
      name: score.name,
      date: DateTime.fromJSDate(score.date),
    }));
  }
}
