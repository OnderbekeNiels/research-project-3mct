import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { User } from "../entity/Users";
import { BadgeService } from "../services/badge.service";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
    private readonly commentService: CommentService,
    private readonly postService: PostService
  ) {}

  @Query(() => [User])
  async UsersAll(@Ctx() ctx: any) {
    // ! works, if calculate response headers is set to false
    return await this.userService.all();
  }

  @Query(() => User)
  async UserById(@Arg("userId") userId: number, @Ctx() ctx: any) {
    return await this.userService.findById(userId);
  }

  @FieldResolver()
  async badges(@Root() user: User, @Ctx() ctx: any) {
    return await this.badgeService.findAllByArgs({
      userId: user.id,
      take: 20,
    });
  }

  @FieldResolver()
  async comments(@Root() user: User, @Ctx() ctx: any) {
    return await this.commentService.findAllByArgs({
      userId: user.id,
      take: 10,
    });
  }

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: any) {
    return await this.postService.findAllByArgs({
      where: { ownerUserId: user.id },
      take: 10,
      order: {
        lastEditDate: "DESC",
      },
    });
  }
}
