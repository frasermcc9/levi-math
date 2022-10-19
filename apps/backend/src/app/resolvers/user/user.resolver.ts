import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ResolvableUser, UserEntity } from './schema/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField()
  dailyScore(@Parent() { firebaseId }: ResolvableUser) {
    return this.userService.getDailyScore(firebaseId);
  }

  @ResolveField()
  username(@Parent() { firebaseId }: ResolvableUser) {
    return this.userService.getUsername(firebaseId) ?? 'Anonymous';
  }
}
