import fetch from "cross-fetch";
import {
  Arg,
  Ctx,
  FieldResolver,
  Info,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entity/Posts";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";
import { VoteService } from "../services/votes.service";
import { Id } from "./DTO/id.response.dto";
import { PostInput } from "./DTO/post.create.dto";
import { PostUpdate } from "./DTO/post.update.dto";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly voteService: VoteService
  ) {}

  // ! Query that is used for the demo
  @Query(() => [Post])
  async PostsAll(@Ctx() ctx: any, @Info() info: any) {
    return await this.postService.all();
  }

  @Query(() => Post)
  async PostById(@Arg("postId") postId: number, @Ctx() ctx: any) {
    return await this.postService.findById(postId);
  }

  @FieldResolver()
  async comments(@Root() post: Post, @Ctx() ctx: any) {
    return await this.commentService.findAllByArgs({
      where: { postId: post.id },
    });
  }

  @FieldResolver()
  async ownerUser(@Root() post: Post, @Ctx() ctx: any) {
    return await this.userService.findById(post.ownerUserId);
  }

  @FieldResolver()
  async votesCount(@Root() post: Post, @Ctx() ctx: any): Promise<number> {
    const votes = await this.voteService.countByArgs({
      where: { postId: post.id },
    });
    return +votes;
  }

  @Mutation(() => Post)
  async CreatePost(@Arg("data") newPost: PostInput): Promise<Post> {
    const post: Post = await this.postService.create(newPost);
    // ! purge al caches with type post so there are no stale caches.
    await fetch("https://admin.graphcdn.io/stackof-rp", {
      method: "POST", // Always POST purge mutations
      headers: {
        "Content-Type": "application/json", // and specify the Content-Type
        "graphcdn-token": "dashboard-28079ab7",
      },
      body: JSON.stringify({ query: `mutation { purgeUser }` }),
    }).catch((e) => console.error(e));
    return post;
  }
  
  @Mutation(() => Post)
  async UpdatePost(
    @Arg("postId") postId: number,
    @Arg("data") postUpdate: PostUpdate
  ): Promise<Post> {
    return (await this.postService.update(postId, postUpdate)) as Post;
  }

  @Mutation(() => Id)
  async DeletePost(@Arg("postId") postId: number): Promise<Id> {
    return await this.postService.delete(postId);
  }
}

  