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
  async comments() {
    return await this.commentService.all();
  }

//   @FieldResolver()
//   async badges(@Root() Comment: Comment) {
//     return await this.badgeService.findAllByCommentId(Comment.id);
//   }

//   @FieldResolver()
//   async post(@Root() Comment: Comment) {
//     return await this.commentService.findAll(Comment.id);
//   }

  // @FieldResolver()
  // async comments(@Root() Comment: Comment) {
  //   return await this.commentService.findAllByCommentId(Comment.id);
  // }
}
