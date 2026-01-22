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

    const user = users.find((record) => {
      record.name === params.userName;
    }) ?? null;
    if (user) {
      // NOTE: User already exists

      return user;
    } else {
      // NOTE: Create new user

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
