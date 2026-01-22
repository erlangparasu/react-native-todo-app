import { TodoDTO } from "../dtos/TodoDTO";
import { TodoRepository } from "../repositories/TodoRepository";

export class DoneTodoUsecase {
    constructor(
        private todoRepository: TodoRepository,
    ) {}

    async execute(params: {
        userId: number;
        todoId: number;
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
            status: "done",
            doneAt: now,
            updatedAt: now,
            deletedAt: null,
        };
        await this.todoRepository.localUpdate({ ...newTodo });

        return true;
    }
}
