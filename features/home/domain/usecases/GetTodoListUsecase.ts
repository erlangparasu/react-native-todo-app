import { TodoRepository } from "../repositories/TodoRepository";

export class GetTodoListUsecase {
    constructor(
        private todoRepository: TodoRepository,
    ) {}

    async execute(params: {
        userId: number;
    }) {
        const todos = await this.todoRepository.localGetAll();

        const userTodos = todos.filter((rec) => {
            return rec.userId === params.userId;
        });

        return userTodos;
    }
}

//   localAdd(todoItem: TodoDTO): Promise<number>;
//   localUpdate(todoItem: TodoDTO): Promise<boolean>;
