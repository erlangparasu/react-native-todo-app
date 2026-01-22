import { TodoDTO } from "../dtos/TodoDTO";
import { TodoRepository } from "../repositories/TodoRepository";

export class DeleteTodoUsecase {
  constructor(
    private todoRepository: TodoRepository,
  ) {}

  async execute(params: {
    userId: number;
    todoId: number;
    forceDelete: boolean;
  }): Promise<boolean> {
    const todos = await this.todoRepository.localGetAll();

    const todo = todos.find((rec) => {
      return rec.id === params.todoId;
    });

    if (todo) {
      // ok
    } else {
      return false;
    }

    if (todo.userId !== params.userId) {
      // NOTE: Forbidden
      return false;
    }

    const now = (new Date()).toISOString();

    const newTodo: TodoDTO = {
      ...todo,
      status: "deleted",
      updatedAt: now,
      deletedAt: now,
    };

    if (params.forceDelete) {
      await this.todoRepository.localDelete({ todoId: newTodo.id });
    } else {
      // NOTE: use `update` instead of `delete` for auditable data
      await this.todoRepository.localUpdate({ ...newTodo });
    }

    return true;
  }
}
