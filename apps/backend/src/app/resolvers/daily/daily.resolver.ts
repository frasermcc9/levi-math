import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
  Int,
} from '@nestjs/graphql';
import { FirebaseGuard } from '../../middleware/auth/firebase.guard';
import { JWT } from '../../middleware/auth/jwt.decorator';
import { ResolvableUser } from '../user/schema/user.entity';
import { DailyService } from './daily.service';
import {
  DailyScoreEntity,
  ResolvableDailyScore,
} from './schema/daily-score.entity';
import { QuestionEntity } from './schema/question.entity';
import { DecodedIdToken } from 'firebase-admin/auth';

@Resolver(() => DailyScoreEntity)
export class DailyResolver {
  constructor(private readonly dailyService: DailyService) {}

  @UseGuards(FirebaseGuard)
  @Query(() => [QuestionEntity])
  async getDailyQuestions(): Promise<QuestionEntity[]> {
    const questions = await this.dailyService.getDailyQuestions();
    return questions.map((q) => ({ ...q, operator: q.op }));
  }

  @Query(() => [DailyScoreEntity])
  async getDailyScores(): Promise<ResolvableDailyScore[]> {
    return this.dailyService.getDailyScores();
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => String, { nullable: true })
  async startDaily(@JWT() { uid }: DecodedIdToken): Promise<string> {
    return this.dailyService.startDaily(uid);
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => Boolean)
  async submitDaily(
    @JWT() { uid }: DecodedIdToken,
    @Args('key') key: string,
    @Args('milliseconds', { type: () => Int }) ms: number
  ): Promise<boolean> {
    return await this.dailyService.postDaily(uid, key, ms);
  }

  @ResolveField()
  async id(
    @Parent() { date, userFirebaseId }: ResolvableDailyScore
  ): Promise<string | null> {
    const score = await this.dailyService.getScore(userFirebaseId, date);
    return score?._id.toString() ?? null;
  }

  @ResolveField()
  async user(
    @Parent() dailyScore: ResolvableDailyScore
  ): Promise<ResolvableUser> {
    return { firebaseId: dailyScore.userFirebaseId };
  }

  @ResolveField()
  async ms(
    @Parent() { date, userFirebaseId }: ResolvableDailyScore
  ): Promise<number | null> {
    const score = await this.dailyService.getScore(userFirebaseId, date);
    return score?.ms ?? null;
  }
}
