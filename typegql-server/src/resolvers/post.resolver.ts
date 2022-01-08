import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entity/Posts";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { checkCache } from "../utils/redis";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  ttlCache: number = 80

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
          where: {postId: post.id},
          take: 10,
        });
      }
    );
    return comments;
  }
}
