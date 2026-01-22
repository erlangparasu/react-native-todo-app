// ● User will key in their name to proceed
// ● User will be able to create a Todo
// ● All Todos are able to be set done and delete Todo
// ● User Todos are saved on local storage. Todo is saved by user name
// ● Users can see their own Todo only
export interface TodoDTO {
  id: number;
  content: string;
  dueDate: string;
  status: "open" | "done" | "deleted";
  createdAt: string;
  doneAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  userId: number;
}
