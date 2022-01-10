export const enum ETaskSubtask {
  task= 'task',
  subtask = 'subtask'
}

export interface ITodo {
  state: 'singleTodo'
  _id?: string;
  name: string;
  index: number;
  isCompleted: boolean;
  role: ETaskSubtask;
}

export interface IDisplayedTodoState {
  state: 'todosCollection',
  todos: ITodo[]
}