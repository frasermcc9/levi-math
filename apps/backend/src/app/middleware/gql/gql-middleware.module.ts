import { Module } from '@nestjs/common';
import { DateTimeScalar } from './datetime.scalar';

@Module({
  providers: [DateTimeScalar],
  exports: [DateTimeScalar],
})
export class GraphQLMiddlewareModule {}
