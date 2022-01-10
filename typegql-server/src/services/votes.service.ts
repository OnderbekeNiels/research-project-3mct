import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Vote } from "../entity/Votes";

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {}

@Service()
export class VoteService {
  @InjectRepository(VoteRepository)
  private readonly voteRepository: VoteRepository;

  async all() {
    return await this.voteRepository.find({
      take: 3,
    });
  }

  async findById(id: number) {
    return await this.voteRepository.findOne({
      id: id,
    });
  }

  async findAllByArgs(args: {}) {
    return await this.voteRepository.find(args);
  }

  async countByArgs(args: {}) {
    return await this.voteRepository.count(args);
  }

  async findByArgs(args: {}) {
    return await this.voteRepository.findOne(args);
  }
}
