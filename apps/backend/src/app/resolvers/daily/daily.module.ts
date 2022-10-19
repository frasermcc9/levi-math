import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DailyScore,
  DailyScoreSchema,
} from '../../database/schema/daily-score.schema';
import { ServiceModule } from '../../services/service.module';
import { DailyResolver } from './daily.resolver';
import { DailyService } from './daily.service';

@Module({
  providers: [DailyResolver, DailyService],
  imports: [
    ServiceModule,
    MongooseModule.forFeature([
      { name: DailyScore.name, schema: DailyScoreSchema },
    ]),
  ],
})
export class DailyModule {}
