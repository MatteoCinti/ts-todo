import { PayloadAction } from '@reduxjs/toolkit';
import { socket } from '../../sockets';
import { CREATE_NEW_LIST } from '../../sockets/actions';
import { saveToLocalStorage } from '../utils/utils';
import { ISingleList, ITodoLists } from './todoLists.interfaces';

export interface IAddNewListPayload extends ISingleList {
  username?: string;
}

export const addNewList = (
  state: ITodoLists,
  action: PayloadAction<IAddNewListPayload>,
) => {
  const { name, username } = action.payload;
  const listName = name;

  const message = {
    username,
    listName,
  };
  socket.emit(CREATE_NEW_LIST, message);
};

export const updateTodoLists = (
  state: ITodoLists,
  action: PayloadAction<ISingleList[]>,
) => {
  const updatedState: ITodoLists = {
    state: 'todoLists',
    todoLists: action.payload,
  };

  saveToLocalStorage('todoLists', updatedState);
  return updatedState;
};
