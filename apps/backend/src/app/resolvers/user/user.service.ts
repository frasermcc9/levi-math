import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  DailyScore,
  DailyScoreCollection,
} from '../../database/schema/daily-score.schema';
import { User, UserCollection } from '../../database/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: UserCollection,
    @InjectModel(DailyScore.name)
    private readonly dailyScoreModel: DailyScoreCollection
  ) {}

  async getUsername(firebaseId: string) {
    const user = await this.userModel.findOne({ firebaseId });
    return user?.username;
  }

  async getDailyScore(firebaseId: string) {
    const today = new Date();
    const dailyScore = await this.dailyScoreModel.findOne({
      firebaseId,
      date: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + 1
        ),
      },
    });

    return dailyScore;
  }
}
