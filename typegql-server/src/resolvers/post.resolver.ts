import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entity/Posts";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";
import { checkCache } from "../utils/redis";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly userService: UserService
  ) {}

  ttlCache: number = 20;

  @Query(() => [Post])
  async PostsAll() {
    return await this.postService.all();
  }

  // @FieldResolver()
  // async comments(@Root() post: Post) {
  //   return await this.commentService.findAllByArgs({
  //     where: { postId: post.id },
  //     take: 10,
  //   });
  // }

  @FieldResolver()
  async comments(@Root() post: Post, @Ctx() ctx: any) {
    const comments = await checkCache(
      ctx.redisClient,
      `comments-from-post-${post.id}`,
      this.ttlCache,
      async () => {
        return await this.commentService.findAllByArgs({
          where: { postId: post.id },
          take: 10,
        });
      }
    );
    return comments;
  }

  @FieldResolver()
  async ownerUser(@Root() post: Post, @Ctx() ctx: any) {
    const owner = await checkCache(
      ctx.redisClient,
      `owner-${post.ownerUserId}-from-post-${post.id}`,
      this.ttlCache,
      async () => {
        const s =  await this.userService.findById(post.ownerUserId);
        // console.log({s})
        return s
      }
    );
    return owner;
  }
}
