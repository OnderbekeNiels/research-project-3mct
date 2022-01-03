
import { EntityTarget, getRepository, Repository } from "typeorm";
import { User } from "../entity/Users";

export class UserService {
  public repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  all = async () => {
    return await this.repository.find();
  };
}
