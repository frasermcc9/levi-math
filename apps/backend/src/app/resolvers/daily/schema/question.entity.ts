import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class QuestionEntity {
  @Field()
  lhs: number;

  @Field()
  rhs: number;

  @Field()
  operator: string;
}
