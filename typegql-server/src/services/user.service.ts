import { Service } from "typedi";
import {
  EntityRepository,
  Repository,
} from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/Users";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

@Service()
export class UserService {
  @InjectRepository(UserRepository)
  private readonly userRepository: UserRepository;

  async all() {
    return await this.userRepository.find({
      take: 140,
    });
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      id: id,
    });
  }

  async findAllByArgs(args: {}) {
    return await this.userRepository.find(args);
  }

  async findByArgs(args: {}) {
    return await this.userRepository.findOne(args);
  }
}
