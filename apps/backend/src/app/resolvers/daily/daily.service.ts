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

/**
 * Daily service
 *
 * When the user starts a daily, a new daily score is created, without the score
 * (ms). The key returned to the user is the ID of this document. If the user
 * attempts to start a daily again (outside of a grace period of 10 seconds),
 * the score is set to null and can no longer be submitted.
 *
 * When the user submits a score, the score is set to the time it took to
 * complete the daily IF the ms in the document is undefined. If the ms is
 * already set or is null, the score is not updated.
 *
 * Currently the duration is set by the client, because I trust my friends,
 * but I'll probably change this to a server-side check soon.
 */
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
      // grace period of 10 seconds to call again
      const diff = Math.abs(
        dateTime.diff(DateTime.fromJSDate(alreadyStarted.date)).as('seconds')
      );
      if (alreadyStarted.ms === undefined && diff > 10) {
        await alreadyStarted.updateOne({ ms: null });
      }
      return null;
    }

    const date = dateTime.toJSDate();
    const dailyScore = new DailyScore({ date, userFirebaseId });
    const newDaily = await this.dailyScoreModel.create(dailyScore);
    return newDaily._id.toString();
  }

  async postDaily(userFirebaseId: string, key: string, ms: number) {
    const currentScoreDoc = await this.dailyScoreModel.findById(key);

    if (!currentScoreDoc) {
      return false;
    }

    if (currentScoreDoc.userFirebaseId !== userFirebaseId) {
      return false;
    }

    if (currentScoreDoc.ms === null) {
      return false;
    }

    await currentScoreDoc.updateOne({ ms });

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
