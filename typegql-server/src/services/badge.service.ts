import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Badge } from "../entity/Badges";

@EntityRepository(Badge)
export class BadgeRepository extends Repository<Badge> {}

@Service()
export class BadgeService {
  @InjectRepository(BadgeRepository)
  private readonly badgeRepository: BadgeRepository;

  async all() {
    return await this.badgeRepository.find({
      take: 15,
    });
  }

  async findById(id: number) {
    return await this.badgeRepository.findOne({
      id: id,
    });
  }

  async findAllByArgs(args: {}) {
    return await this.badgeRepository.find(args);
  }
}
