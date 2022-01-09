import { CaseReducer, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import socket from "../../sockets";
import { CREATE_NEW_LIST } from "../../sockets/actions";
import { saveToLocalStorage } from "../utils/utils";
import { IAddNewListProps, ISingleList, ITodoLists } from "./todoLists.interfaces";

export const addNewList = createAsyncThunk(
  'todoLists/addNewList',
  async (payload: IAddNewListProps, thunkAPI) => {
    try {
      const { name, username } = payload;
      const listName = name;
  
      const message = {
        username,
        listName
      }
      socket.emit(CREATE_NEW_LIST, message);
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  }
)

export const updateTodoLists = ( state: ITodoLists, action: PayloadAction<ISingleList[]> ) => {
  const updatedState = {
    ...state,
    todoLists: action.payload
  }

  saveToLocalStorage('todoLists', updatedState)
  return updatedState;
}