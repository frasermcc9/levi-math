import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';
import { ScoreModule } from './resolvers/score/score.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { GraphQLMiddlewareModule } from './middleware/gql/gql-middleware.module';
import { FirebaseModule } from '@levi-math/firebase';
import { FirebaseGuard } from './middleware/auth/firebase.guard';
import { FirebaseAuthStrategy } from './middleware/auth/firebase.strategy';
import { DailyModule } from './resolvers/daily/daily.module';
import { UserModule } from './resolvers/user/user.module';
import { User, UserSchema } from './database/schema/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule.forRoot({
      googleApplicationCredential: `${__dirname}/assets/service-account.json`,
    }),
    MongooseModule.forRoot(process.env['MONGO_URI'] ?? ''),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        sortSchema: true,
        autoSchemaFile: join(process.cwd(), 'apps/backend/src/app/schema.gql'),
        definitions: {
          path: join(process.cwd(), 'apps/backend/src/app/types/graphql.ts'),
        },
        formatError: (error: GraphQLError) => {
          Logger.error(error.originalError);
          console.error(error.originalError?.stack);

          return error;
        },
      }),
    }),
    GraphQLMiddlewareModule,
    DatabaseModule,
    ScoreModule,
    DailyModule,
    UserModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],

  providers: [FirebaseGuard, FirebaseAuthStrategy],
})
export class AppModule {}
