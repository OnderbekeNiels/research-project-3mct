import { resolveGraphqlOptions } from "apollo-server-core";
import { Arg, Ctx, FieldResolver, Info, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entity/Posts";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";
import { VoteService } from "../services/votes.service";
import { checkCache } from "../utils/redis";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly voteService: VoteService
  ) {}

  @Query(() => [Post])
  async PostsAll(@Ctx() ctx: any, @Info() info: any) {
    // info.cacheControl.setCacheHint({ maxAge: 60 }); // works !
    const posts = await checkCache(ctx.redisClient, "allposts", async () => {
      return await this.postService.all();
    })
    return posts;
  }

  @Query(() => Post)
  async PostById(@Arg("postId") postId: number, @Ctx() ctx: any) {
    const post = await checkCache(
      ctx.redisClient,
      `post-${postId}`,
      async () => {
        return await this.postService.findById(postId);
      }
    );
    return post;
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
      async () => {
        return await this.commentService.findAllByArgs({
          where: { postId: post.id },
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
      async () => {
        return await this.userService.findById(post.ownerUserId);
      }
    );
    return owner;
  }

  @FieldResolver()
  async votesCount(
    @Root() post: Post,
    @Ctx() ctx: any,
  ): Promise<number> {
    const votes = await checkCache(
      ctx.redisClient,
      `vote-count-from-post-${post.id}`,
      async () => {
        return await this.voteService.countByArgs({
          where: { postId: post.id },
        });
      }
    );
    return +votes;
  }
}
