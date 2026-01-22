import { TodoDTO } from "../dtos/TodoDTO";
import { TodoRepository } from "../repositories/TodoRepository";

export class GetTodoListUsecase {
  constructor(
    private todoRepository: TodoRepository,
  ) {}

  async execute(params: {
    userId: number;
  }): Promise<TodoDTO[]> {
    const todos = await this.todoRepository.localGetAll();

    const userTodos = todos.filter((rec) => {
      return rec.userId === params.userId;
    }).filter((rec) => {
      return rec.deletedAt == null;
    }).filter((rec) => {
      return rec.status !== "deleted";
    });

    return userTodos;
  }
}

//   localAdd(todoItem: TodoDTO): Promise<number>;
//   localUpdate(todoItem: TodoDTO): Promise<boolean>;
