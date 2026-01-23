import { UserDTO } from "../dtos/UserDTO";
import { UserRepository } from "../repositories/UserRepository";

export class LoginOrRegisterUsecase {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async execute(params: {
    userName: string;
  }): Promise<UserDTO> {
    const users = await this.userRepository.localGetAll();
    console.log({ users });

    const foundUser = users.find((record) => {
      return record.name === params.userName;
    }) ?? null;
    if (foundUser) {
      // NOTE: User already exists
      console.log("user already registered");

      return foundUser;
    } else {
      // NOTE: Create new user
      console.log("create new user");

      const maxId = users.reduce((max, user) => {
        return user.id > max ? user.id : max;
      }, 1);

      const newUser = {
        id: maxId + 1,
        name: params.userName,
      };
      await this.userRepository.localAdd({ ...newUser });

      return newUser;
    }
  }
}
