import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ScoreEntity } from './schema/score.entity';
import { ScoreInput } from './schema/score.input';
import { ScoreService } from './score.service';

@Resolver(() => ScoreEntity)
export class ScoreResolver {
  constructor(private readonly scoreService: ScoreService) {}

  @Query(() => [ScoreEntity])
  async allScores(): Promise<ScoreEntity[]> {
    return this.scoreService.getTopScores(10);
  }

  @Query(() => [ScoreEntity])
  async allScoresUniqueUser(): Promise<ScoreEntity[]> {
    return this.scoreService.getTopScoresUniqueUser(10);
  }

  @Query(() => [ScoreEntity])
  async allScoresPastWeek(): Promise<ScoreEntity[]> {
    return this.scoreService.getTopScoresPastWeek(10);
  }

  @Mutation(() => ScoreEntity)
  createScore(@Args('score') score: ScoreInput) {
    return this.scoreService.createScore(score);
  }

  @Mutation(() => Boolean)
  async deleteScore(@Args('number') number: number) {
    await this.scoreService.deleteScore(number);
  }
}
