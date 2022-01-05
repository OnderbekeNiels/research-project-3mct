import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Comment } from "../entity/Comments";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";


@Service()
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService
  ) {}

  @Query(() => [Comment])
  async CommentsAll() {
    return await this.commentService.all();
  }

  @FieldResolver()
  async post(@Root() comment: Comment) {
    return await this.postService.findById(comment.postId);
  }

}
