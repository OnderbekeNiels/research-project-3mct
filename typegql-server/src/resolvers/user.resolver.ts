import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entity/Users";
import { Comment } from "../entity/Comments";
import { BadgeService } from "../services/badge.service";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";
import { CacheControl } from "../cache-control";
import { checkCache } from "../utils/redis";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
    private readonly commentService: CommentService
  ) {}

  @Query(() => [User])
  async UsersAll(@Ctx() ctx: any) {
    const users = await checkCache(ctx.redisClient, "allusers", 60, async () => {
      return await this.userService.all();
    })
    return users;
  }

  @FieldResolver()
  async badges(@Root() user: User) {
    return await this.badgeService.findAllByArgs({ userId: user.id });
  }

  @FieldResolver()
  async comments(@Root() user: User) {
    return await this.commentService.findAllByArgs({ userId: user.id });
  }
}
