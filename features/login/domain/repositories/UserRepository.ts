import { UserDTO } from "../dtos/UserDTO";

export interface UserRepository {
  localGetAll(): Promise<UserDTO[]>;
  localGetOne({ userId }: { userId: number }): Promise<UserDTO | null>;
  localAdd(userItem: UserDTO): Promise<number>;
  localUpdate(userItem: UserDTO): Promise<boolean>;
  localDelete({ userId }: { userId: number }): Promise<boolean>;
}
