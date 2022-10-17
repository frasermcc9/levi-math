import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Score,
  ScoreCollection,
  ScoreDocument,
} from '../../database/schema/score.schema';
import { DateTime } from 'luxon';
import { ScoreEntity } from './schema/score.entity';

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

  async getTopScoresUniqueUser(count: number): Promise<ScoreEntity[]> {
    const scores = await this.scoreModel.aggregate([
      {
        $group: {
          _id: '$name',
          group: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: {
          newRoot: '$group',
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
      {
        $limit: count,
      },
    ]);

    return scores.map(this.toEntity);
  }

  async topScoresPastWeekUniqueUser(count: number): Promise<ScoreEntity[]> {
    const scores = await this.scoreModel.aggregate([
      {
        $match: {
          date: { $gte: DateTime.local().minus({ days: 7 }).toJSDate() },
        },
      },
      { $sort: { score: -1 } },
      { $group: { _id: '$name', group: { $first: '$$ROOT' } } },
      { $replaceRoot: { newRoot: '$group' } },
      { $limit: count },
    ]);

    return scores.map(this.toEntity);
  }

  async getTopScoresPastWeek(count: number): Promise<ScoreEntity[]> {
    const scores = await this.scoreModel.find(
      {
        date: { $gte: DateTime.local().minus({ days: 7 }).toJSDate() },
      },
      {},
      { limit: count, sort: { score: -1 } }
    );
    return scores.map(this.toEntity);
  }

  deleteScore(number: number) {
    return this.scoreModel.deleteMany({ score: number });
  }

  toEntity(score: ScoreDocument): ScoreEntity {
    return {
      id: score._id,
      score: score.score,
      name: score.name,
      date: DateTime.fromJSDate(score.date),
    };
  }
}
