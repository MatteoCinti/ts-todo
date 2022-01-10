export interface ITodo {
  state: 'singleTodo';
  _id?: string;
  name: string;
  isCompleted: boolean;
}


export const todoElementTemplate: ITodo = {
  state: 'singleTodo',
  name: '', 
  isCompleted: false,
}

export interface ISingleList {
  _id?: string;
  state?: 'singleList',
  isSelected: boolean,
  name: string;
  category?: string;
} 

export interface ITodoLists {
  state: 'todoLists' | string,
  todoLists: ISingleList[]
}

export interface IAddNewListProps extends ISingleList{ 
  username?: string;
}