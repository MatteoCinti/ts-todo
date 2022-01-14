export interface ITodo {
  state: 'singleTodo';
  _id?: string;
  name: string;
  index: number;
  price: number | '';
  isCompleted: boolean;
  role: string;
  parent?: string;
}

const emptyTodo: ITodo = {
  state: 'singleTodo',
  name: '',
  index: 0,
  price: '',
  isCompleted: false,
  role: '',
}

export const todoElementTemplate: ITodo = {
  ...emptyTodo,
  role: 'task',
};

export const subtaskElementTemplate: ITodo = {
  ...emptyTodo,
  parent: '',
  role: 'subtask',
};

export interface ISingleList {
  _id?: string;
  state?: 'singleList',
  isSelected: boolean,
  name: string;
  category?: string;
  todos: ITodo[] | [];
}

export const emptySingleList: ISingleList = {
  state: 'singleList',
  isSelected: true,
  name: '',
  todos: [],
};

export interface ITodoLists {
  state: 'todoLists' | string,
  todoLists: ISingleList[]
}

export interface IAddNewListProps extends ISingleList{
  username?: string;
}
