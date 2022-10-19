import { Field, ID, ObjectType } from '@nestjs/graphql';
import { DailyScoreEntity } from '../../daily/schema/daily-score.entity';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  firebaseId: string;

  @Field(() => DailyScoreEntity, { nullable: true })
  dailyScore: DailyScoreEntity;

  @Field()
  username: string;
}

export type ResolvableUser = Pick<UserEntity, 'firebaseId'>;
