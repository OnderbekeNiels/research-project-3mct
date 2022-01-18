import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Post } from "../entity/Posts";
import { PostInput } from "../resolvers/DTO/post.create.dto";
import { PostUpdate } from "../resolvers/DTO/post.update.dto";
import { CommentRepository } from "./comment.service";
import { VoteRepository } from "./votes.service";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}

@Service()
export class PostService {
  @InjectRepository(PostRepository)
  private readonly postRepository: PostRepository;
  @InjectRepository(VoteRepository)
  private readonly votesRepository: VoteRepository;
  @InjectRepository(CommentRepository)
  private readonly commentRepository: CommentRepository;

  async all() {
    return await this.postRepository.find({
      take: 50,
    });
  }

  async findById(id: number) {
    return await this.postRepository.findOne({
      id: id,
    });
  }

  async findAllByArgs(args: {}) {
    return await this.postRepository.find(args);
  }

  async create(postInput: PostInput) {
    return this.postRepository.save(postInput);
  }

  async update(postId: number, postInput: PostUpdate) {
    if (this.postRepository.findOne(postId)) {
      this.postRepository.update(postId, postInput);
      return { id: postId, ...postInput };
    } else {
      throw "post does not exists";
    }
  }

  async delete(postId: number) {
    if (this.postRepository.findOne(postId)) {
      await this.commentRepository.delete({ postId: postId });
      await this.votesRepository.delete({ postId: postId });
      await this.postRepository.delete(postId);
      return { id: postId };
    } else {
      throw "post does not exists";
    }
  }
}
