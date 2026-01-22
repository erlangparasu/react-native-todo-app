import { TodoDTO } from "../../domain/dtos/TodoDTO";
import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { TodoLocalDatasource } from "../data-sources/TodoLocalDatasource";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(
    private todoLocalDatasource: TodoLocalDatasource,
  ) {}

  async localGetAll(): Promise<TodoDTO[]> {
    const records = await this.todoLocalDatasource.getList();

    return records;
  }

  async localGetOne({ todoId }: { todoId: number }): Promise<TodoDTO | null> {
    const record = await this.todoLocalDatasource.get({
      todoId: todoId,
    });

    return record;
  }

  async localAdd(todoItem: TodoDTO): Promise<number> {
    await this.todoLocalDatasource.add({
      todoItem: todoItem,
    });

    return todoItem.id;
  }

  async localUpdate(todoItem: TodoDTO): Promise<boolean> {
    await this.todoLocalDatasource.update({
      todoItem: todoItem,
    });

    return true;
  }

  async localDelete({ todoId }: { todoId: number }): Promise<boolean> {
    await this.todoLocalDatasource.delete({
      todoId: todoId,
    });

    return true;
  }
}
