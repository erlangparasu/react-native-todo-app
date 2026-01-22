import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoDTO } from "../../domain/dtos/TodoDTO";

export class TodoLocalDatasource {
  async getList(): Promise<TodoDTO[]> {
    console.log("getList:");

    try {
      const raw = await AsyncStorage.getItem("todos.v3");
      if (raw) {
        const parsed = JSON.parse(raw) as { recs: TodoDTO[] };
        console.log({ parsed });

        return parsed.recs;
      } else {
        return [];
      }
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }

  async get(params: {
    todoId: number;
  }) {
    console.log("get:", { params });

    const records = await this.getList();

    const found = records.find((record) => {
      return record.id === params.todoId;
    }) ?? null;

    return found;
  }

  async add(params: {
    todoItem: TodoDTO;
  }) {
    console.log("add:", { params });

    try {
      const oldRecords = await this.getList();
      const newRecords = oldRecords.map((item) => {
        return { ...item };
      });
      newRecords.push({ ...params.todoItem });

      await AsyncStorage.setItem(
        "todos.v3",
        JSON.stringify({ recs: newRecords }),
      );
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }

  async update(params: {
    todoItem: TodoDTO;
  }) {
    console.log("update:", { params });

    try {
      const oldRecords = await this.getList();
      const newRecords = oldRecords.filter((record) => {
        record.id !== params.todoItem.id;
      }).map((item) => {
        return { ...item };
      });

      newRecords.push({ ...params.todoItem });
      await AsyncStorage.setItem(
        "todos.v3",
        JSON.stringify({ recs: newRecords }),
      );
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }

  async delete(params: {
    todoId: number;
  }) {
    console.log("delete:", { params });

    try {
      const oldRecords = await this.getList();
      const newRecords = oldRecords.filter((record) => {
        record.id !== params.todoId;
      })
        .map((item) => {
          return { ...item };
        });

      await AsyncStorage.setItem(
        "todos.v3",
        JSON.stringify({ recs: newRecords }),
      );
    } catch (error) {
      console.log("catch:", { error });

      throw error;
    }
  }
}
