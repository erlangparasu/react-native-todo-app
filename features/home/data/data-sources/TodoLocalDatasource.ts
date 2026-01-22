import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoDTO } from "../../domain/dtos/TodoDTO";

export class TodoLocalDatasource {
    async getList(): Promise<TodoDTO[]> {
        try {
            const raw = await AsyncStorage.getItem("todos");
            if (raw) {
                const records = JSON.parse(raw) as TodoDTO[];
                console.log({ records });

                return records;
            } else {
                return [];
            }
        } catch (error) {
            console.log('catch:', { error });

            throw error;
        }
    }

    async get(params: {
        todoId: number;
    }) {
        const records = await this.getList();

        const found = records.find((record) => {
            return record.id === params.todoId;
        }) ?? null;

        return found;
    }

    async add(params: {
        todoItem: TodoDTO;
    }) {
        try {
            const records = await this.getList();
            records.push({ ...params.todoItem });

            await AsyncStorage.setItem("todos", JSON.stringify(records));
        } catch (error) {
            console.log('catch:', { error });

            throw error;
        }
    }

    async update(params: {
        todoItem: TodoDTO;
    }) {
        try {
            const oldRecords = await this.getList();
            const newRecords = oldRecords.filter((record) => {
                record.id !== params.todoItem.id;
            });

            newRecords.push({ ...params.todoItem });
            await AsyncStorage.setItem("todos", JSON.stringify(newRecords));
        } catch (error) {
            console.log('catch:', { error });

            throw error;
        }
    }

    async delete(params: {
        todoId: number;
    }) {
        try {
            const oldRecords = await this.getList();
            const newRecords = oldRecords.filter((record) => {
                record.id !== params.todoId;
            });

            await AsyncStorage.setItem("todos", JSON.stringify(newRecords));
        } catch (error) {
            console.log('catch:', { error });

            throw error;
        }
    }
}
