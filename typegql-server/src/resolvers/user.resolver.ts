import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entity/Users";
import { BadgeService } from "../services/badge.service";
import { UserService } from "../services/user.service";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService, private readonly badgeService: BadgeService) {}

  @Query(() => [User])
  async GetAllUsers() {
    return await this.userService.all();
  }

  @FieldResolver()
  async badges(@Root() user: User) {
    return await this.badgeService.findAllByUserId(user.id);
  }
}
