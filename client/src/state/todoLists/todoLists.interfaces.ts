import { ITodo } from "../todoElement.ts/todoElement.interfaces";

export interface ISingleList {
  _id?: string;
  state?: 'singleList',
  isSelected: boolean,
  name: string;
  category?: string;
  todos: ITodo[];
} 

export interface ITodoLists {
  state: 'todoLists' | string,
  todoLists: ISingleList[]
}

export interface IAddNewListProps extends ISingleList{ 
  username?: string;
}