import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database/schema/user.schema';
import {
  DailyScore,
  DailyScoreSchema,
} from '../../database/schema/daily-score.schema';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: DailyScore.name, schema: DailyScoreSchema },
    ]),
  ],
})
export class UserModule {}
