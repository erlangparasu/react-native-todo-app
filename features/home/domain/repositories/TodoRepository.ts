import { TodoDTO } from "../dtos/TodoDTO";

export interface TodoRepository {
  localGetAll(): Promise<TodoDTO[]>;
  localGetOne({ todoId }: { todoId: number }): Promise<TodoDTO | null>;
  localAdd(todoItem: TodoDTO): Promise<number>;
  localUpdate(todoItem: TodoDTO): Promise<boolean>;
  localDelete({ todoId }: { todoId: number }): Promise<boolean>;
}
