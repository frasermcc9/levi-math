import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DateTime } from 'luxon';
import { UserEntity } from '../../user/schema/user.entity';

@ObjectType()
export class DailyScoreEntity {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  ms: number;

  @Field()
  userFirebaseId: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field()
  date: DateTime;
}

export type ResolvableDailyScore = Pick<
  DailyScoreEntity,
  'userFirebaseId' | 'date'
>;
