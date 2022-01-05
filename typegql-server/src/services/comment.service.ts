import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Comment } from "../entity/Comments";

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {}

@Service()
export class CommentService {
  @InjectRepository(CommentRepository)
  private readonly commentRepository: CommentRepository;

  async all() {
    return await this.commentRepository.find({
      take: 15,
    });
  }

  async findById(id: number) {
    return await this.commentRepository.findOne({
      id: id,
    });
  }

  async findAllByUserId(id: number) {
     return await this.commentRepository.find({
       take: 5,
       where: [{ userId: id }],
       relations:["post"]
     });
  }
}
