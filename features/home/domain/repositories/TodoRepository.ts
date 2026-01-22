import { TodoDTO } from "../dtos/TodoDTO";

export interface TodoRepository {
  getAll(): Promise<TodoDTO[]>;
  get({ todoId }: { todoId: number }): Promise<TodoDTO>;
  add(todoItem: TodoDTO): Promise<number>;
  update(todoItem: TodoDTO): Promise<boolean>;
  delete({ todoId }: { todoId: number }): Promise<boolean>;
}
