import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ScoreInput {
  @Field(() => Int)
  score: number;

  @Field()
  name: string;
}
