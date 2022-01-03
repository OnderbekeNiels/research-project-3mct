import { Query, Resolver } from "type-graphql";
import { User } from "../entity/Users";
import { UserService } from "../services/user.service";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async GetAllUsers() {
    const userService = new UserService();
    return await userService.all();
  }
}
