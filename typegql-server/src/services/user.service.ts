
import { Service, Inject } from "typedi";
import { EntityRepository, EntityTarget, getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entity/Users";

@EntityRepository(User)
export class UserRepository extends Repository<User> {}

@Service()
export class UserService {
  @InjectRepository(UserRepository)
  private readonly userRepository: UserRepository;

  all = async () => {
    return await this.userRepository.find({
      take: 5,
      relations: ["badges"],
      order: { id: "ASC" },
    });
  };
}
