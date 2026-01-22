import { types } from "mobx-state-tree";

// Individual Todo item
const Todo = types
  .model("Todo", {
    id: types.identifierNumber,
    title: types.string,
    isDone: false,
  })
  .actions((self) => ({
    toggle() {
      self.isDone = !self.isDone;
    },
  }));

// The Root Store
export const TodoStore = types
  .model("TodoStore", {
    todos: types.array(Todo),
  })
  .views((self) => ({
    // Derived state (computed values)
    get completedCount() {
      return self.todos.filter((t) => t.isDone).length;
    },
  }))
  .actions((self) => ({
    addTodo(title: string) {
      self.todos.push({
        id: Math.random(),
        title,
      });
    },
  }));

// Create an instance (the "snapshot")
export const rootStore = TodoStore.create({
  todos: [{ id: 1, title: "Learn MST", isDone: false }],
});
