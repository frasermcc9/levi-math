import { defaultGameConfig, Maths } from '@levi-math/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DateTime } from 'luxon';
import {
  DailyScore,
  DailyScoreCollection,
} from '../../database/schema/daily-score.schema';
import { RandomService } from '../../services/random.service';
import { ResolvableDailyScore } from './schema/daily-score.entity';

@Injectable()
export class DailyService {
  constructor(
    private readonly randomService: RandomService,
    @InjectModel(DailyScore.name)
    private readonly dailyScoreModel: DailyScoreCollection
  ) {}

  async startDaily(userFirebaseId: string) {
    const dateTime = DateTime.now();

    const alreadyStarted = await this.getScore(userFirebaseId, dateTime);

    if (alreadyStarted) {
      return null;
    }

    const date = dateTime.toJSDate();
    const dailyScore = new DailyScore({ date, userFirebaseId });
    const newDaily = await this.dailyScoreModel.create(dailyScore);
    return newDaily._id.toString();
  }

  async postDaily(userFirebaseId: string, key: string, ms: number) {
    const partialScore = await this.dailyScoreModel.findById(key);

    if (!partialScore) {
      return false;
    }

    if (partialScore.userFirebaseId !== userFirebaseId) {
      return false;
    }

    const createdTime = DateTime.fromJSDate(partialScore.date);

    // if the score was created more than 120 seconds ago then its probably
    // cheated
    if (createdTime.diffNow().as('seconds') > 120) {
      return false;
    }

    await partialScore.updateOne({ ms });

    return true;
  }

  async getDailyScores(): Promise<ResolvableDailyScore[]> {
    const today = DateTime.now().startOf('day');
    const results = await this.dailyScoreModel.find(
      {
        date: {
          $gte: today.toJSDate(),
          $lte: today.endOf('day').toJSDate(),
        },
        ms: {
          $ne: null,
          $gt: 0,
        },
      },
      {},
      { sort: { ms: 1 }, limit: 10 }
    );

    return results.map((result) => ({
      date: DateTime.fromJSDate(result.date),
      ms: result.ms,
      userFirebaseId: result.userFirebaseId,
    }));
  }

  async getScore(userFirebaseId: string, forDay: DateTime) {
    const dailyScore = await this.dailyScoreModel.findOne({
      userFirebaseId,
      date: {
        $gte: forDay.startOf('day').toJSDate(),
        $lte: forDay.endOf('day').toJSDate(),
      },
    });

    return dailyScore ?? null;
  }

  async getDailyQuestions() {
    const generator = this.randomService.getGenerator();

    const boundGenerator = () => generator.random();

    return Array.from({ length: 15 }, () =>
      Maths.nextQuestion(defaultGameConfig, { useRandom: boundGenerator })
    );
  }
}
