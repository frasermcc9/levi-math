import { ObjectType, Field, ID } from '@nestjs/graphql';
import { DateTime } from 'luxon';

@ObjectType()
export class ScoreEntity {
  @Field(() => ID)
  id: string;

  @Field()
  score: number;

  @Field()
  name: string;

  @Field()
  date: DateTime;
}
