import { TodoDTO } from "../dtos/TodoDTO";
import { TodoRepository } from "../repositories/TodoRepository";

export class AddTodoUsecase {
    constructor(
        private todoRepository: TodoRepository,
    ) {}

    async execute(params: {
        userId: number;
        content: string;
        dueDate: string;
    }) {
        const todos = await this.todoRepository.localGetAll();

        const maxId = todos.reduce((max, todo) => {
            return todo.id > max ? todo.id : max;
        }, 1);

        const newTodo: TodoDTO = {
            id: maxId + 1,
            content: params.content,
            dueDate: params.dueDate,
            status: "open", // NOTE: default
            createdAt: (new Date()).toISOString(),
            doneAt: null,
            updatedAt: null,
            deletedAt: null,
            userId: params.userId,
        };
        await this.todoRepository.localAdd({ ...newTodo });

        return newTodo;
    }
}
