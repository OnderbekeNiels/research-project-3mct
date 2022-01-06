import { FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Service } from "typedi";
import { Comment } from "../entity/Comments";
import { CommentService } from "../services/comment.service";
import { PostService } from "../services/posts.service";
import { UserService } from "../services/user.service";


@Service()
@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly userService: UserService
  ) {}

  @Query(() => [Comment])
  async CommentsAll() {
    return await this.commentService.all();
  }

  @FieldResolver()
  async post(@Root() comment: Comment) {
    return await this.postService.findById(comment.postId);
  }

  @FieldResolver()
  async user(@Root() comment: Comment) {
    return await this.userService.findByArgs(comment.userId);
  }
}
