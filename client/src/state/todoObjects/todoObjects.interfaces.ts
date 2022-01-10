export const enum ETaskSubtask {
  task= 'task',
  subtask = 'subtask'
}

export interface ITodo {
  _id?: string;
  name: string;
  index: number;
  isCompleted: boolean;
  role: ETaskSubtask;
}

export interface ISingleTodoState {
  state: 'todos',
  todos: ITodo[]
}