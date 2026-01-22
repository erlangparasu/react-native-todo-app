import { UserDTO } from "../../domain/dtos/UserDTO";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { UserLocalDatasource } from "../data-sources/UserLocalDatasource";

export class UserRepositoryImpl implements UserRepository {
  constructor(
    private userLocalDatasource: UserLocalDatasource,
  ) {}

  async localGetAll(): Promise<UserDTO[]> {
    const records = await this.userLocalDatasource.getList();

    return records;
  }

  async localGetOne({ userId }: { userId: number }): Promise<UserDTO | null> {
    const record = await this.userLocalDatasource.get({
      userId: userId,
    });

    return record;
  }

  async localAdd(userItem: UserDTO): Promise<number> {
    await this.userLocalDatasource.add({
      userItem: userItem,
    });

    return userItem.id;
  }

  async localUpdate(userItem: UserDTO): Promise<boolean> {
    await this.userLocalDatasource.update({
      userItem: userItem,
    });

    return true;
  }

  async localDelete({ userId }: { userId: number }): Promise<boolean> {
    await this.userLocalDatasource.delete({
      userId: userId,
    });

    return true;
  }
}
