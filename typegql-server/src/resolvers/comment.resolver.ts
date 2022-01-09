import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Comment } from "../entity/Comments";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";
import { checkCache } from "../utils/redis";


@Service()
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly userService: UserService
  ) {}

  ttlCache: number = 20;

  @Query(() => [Comment])
  async CommentsAll() {
    return await this.commentService.all();
  }

  @FieldResolver()
  async post(@Root() comment: Comment) {
    return await this.postService.findById(comment.postId);
  }

//   @FieldResolver()
//   async user(@Root() comment: Comment, @Ctx() ctx: any) {
// return await this.userService.findByArgs(comment.userId);
//   }

  @FieldResolver()
  async user(@Root() comment: Comment, @Ctx() ctx: any) {
    const user = await checkCache(
      ctx.redisClient,
      `user-${comment.userId}`,
      this.ttlCache,
      async () => {
        return await this.userService.findByArgs(comment.userId);
      }
    );
    return user;
  }
}
