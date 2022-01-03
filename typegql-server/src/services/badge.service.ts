import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Badge } from "../entity/Badges";

@EntityRepository(Badge)
export class BadgeRepository extends Repository<Badge> {}

@Service()
export class BadgeService {
  @InjectRepository(BadgeRepository)
  private readonly BadgeRepository: BadgeRepository;

  async all() {
    return await this.BadgeRepository.find({
      take: 15,
    });
  }

  async findById(id: number) {
    return await this.BadgeRepository.findOne({
      id: id,
    });
  }

  async findAllByUserId(id: number) {
    return await this.BadgeRepository.find({
      userId: id,
    });
  }
}
