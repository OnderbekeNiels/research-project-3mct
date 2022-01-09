import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Post } from "../entity/Posts";

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {}

@Service()
export class PostService {
  @InjectRepository(PostRepository)
  private readonly postRepository: PostRepository;

  async all() {
    return await this.postRepository.find({
      take: 150,
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
}
