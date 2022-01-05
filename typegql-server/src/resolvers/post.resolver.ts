import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Post } from "../entity/Posts";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";

@Service()
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Query(() => [Post])
  async PostsAll() {
    return await this.postService.all();
  }

  @FieldResolver()
  async comments(@Root() post: Post) {
    return await this.commentService.findAllByArgs({where: {postId: post.id}});
  }
}
