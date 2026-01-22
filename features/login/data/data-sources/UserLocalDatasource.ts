import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserDTO } from "../../domain/dtos/UserDTO";

export class UserLocalDatasource {
  async getList(): Promise<UserDTO[]> {
    try {
      const raw = await AsyncStorage.getItem("users");
      if (raw) {
        const records = JSON.parse(raw) as UserDTO[];
        console.log({ records });

        return records;
      } else {
        return [];
      }
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }

  async get(params: {
    userId: number;
  }) {
    const records = await this.getList();

    const found = records.find((record) => {
      return record.id === params.userId;
    }) ?? null;

    return found;
  }

  async add(params: {
    userItem: UserDTO;
  }) {
    try {
      const records = await this.getList();
      records.push({ ...params.userItem });

      await AsyncStorage.setItem("users", JSON.stringify(records));
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }

  async update(params: {
    userItem: UserDTO;
  }) {
    try {
      const oldRecords = await this.getList();
      const newRecords = oldRecords.filter((record) => {
        record.id !== params.userItem.id;
      });

      newRecords.push({ ...params.userItem });
      await AsyncStorage.setItem("users", JSON.stringify(newRecords));
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }

  async delete(params: {
    userId: number;
  }) {
    try {
      const oldRecords = await this.getList();
      const newRecords = oldRecords.filter((record) => {
        record.id !== params.userId;
      });

      await AsyncStorage.setItem("users", JSON.stringify(newRecords));
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }
}
