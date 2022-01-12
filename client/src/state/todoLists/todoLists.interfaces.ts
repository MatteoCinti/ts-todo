export interface ITodo {
  state: 'singleTodo';
  _id?: string;
  name: string;
  index: number;
  isCompleted: boolean;
  role: string;
}

export const todoElementTemplate: ITodo = {
  state: 'singleTodo',
  name: '',
  index: 0,
  isCompleted: false,
  role: 'task',
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
