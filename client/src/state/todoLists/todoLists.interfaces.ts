export const enum ETaskSubtask {
  task= 'task',
  subtask = 'subtask'
}  
export interface ITodo {
  id: string;
  index: number;
  isCompleted: boolean;
  role: ETaskSubtask;
}

export interface ISingleList {
  state?: 'singleList',
  name: string;
  category?: string;
  todos: ITodo[];
} 

export interface ITodoLists {
  state: "todoLists",
  todoLists: ISingleList[]
}

export interface IAddNewListProps extends ISingleList{ 
  username?: string;
}