import { Arg, Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
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
    private readonly commentService: CommentService,
    private readonly postService: PostService
  ) {}

  ttlCache: number = 20;

  // @Query(() => [User])
  // async UsersAll(@Ctx() ctx: any) {
  //   return await this.userService.all();
  // }

  @Query(() => [User])
  async UsersAll(@Ctx() ctx: any) {
    const users = await checkCache(
      ctx.redisClient,
      "allusers",
      this.ttlCache,
      async () => {
        return await this.userService.all();
      }
    );
    return users;
  }

  @Query(() => User)
  async UserById(@Arg("userId") userId: number, @Ctx() ctx: any) {
    const user = await checkCache(
      ctx.redisClient,
      `user-${userId}`,
      this.ttlCache,
      async () => {
        return await this.userService.findById(userId);
      }
    );
    return user;
  }

  @FieldResolver()
  async badges(@Root() user: User,@Ctx() ctx: any) {
    const badges = await checkCache(
      ctx.redisClient,
      `badges-from-user-${user.id}`,
      this.ttlCache,
      async () => {
        return await this.badgeService.findAllByArgs({
          userId: user.id,
          take: 20,
        });
      }
    );
    return badges;
  }

  // @FieldResolver()
  // async comments(@Root() user: User, @Ctx() ctx: any) {
  //   return await await this.commentService.findAllByArgs({
  //     userId: user.id,
  //     take: 10,
  //   });
  // }

  @FieldResolver()
  async comments(@Root() user: User, @Ctx() ctx: any) {
    const comments = await checkCache(
      ctx.redisClient,
      `comments-from-user-${user.id}`,
      this.ttlCache,
      async () => {
        return await this.commentService.findAllByArgs({
          userId: user.id,
          take: 10,
        });
      }
    );
    return comments;
  }

  // @FieldResolver()
  // async posts(@Root() user: User, @Ctx() ctx: any) {
  //   return await await this.postService.findAllByArgs({
  //     userId: user.id,
  //     take: 10,
  //   });
  // }

  @FieldResolver()
  async posts(@Root() user: User, @Ctx() ctx: any) {
    const posts = await checkCache(
      ctx.redisClient,
      `posts-from-user-${user.id}`,
      this.ttlCache,
      async () => {
        return await this.postService.findAllByArgs({
          where: { ownerUserId: user.id },
          take: 10,
          order: {
            lastEditDate: "DESC",
          },
        });
        
      }
    );
    return posts;
  }
}
