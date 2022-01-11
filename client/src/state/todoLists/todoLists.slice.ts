import { createSlice } from "@reduxjs/toolkit";
import { getPersistedState } from "../utils/utils";
import { ITodoLists } from "./todoLists.interfaces";
import { addNewList, updateTodoLists } from "./todoLists.reducers";

const emptyTodoListsState: ITodoLists = {
  state: 'todoLists',
  todoLists: []
}

const persistedState = getPersistedState();
const initialState = persistedState && persistedState.todoLists
                        ? persistedState.todoLists
                        : emptyTodoListsState

console.log("🚀 ~ file: todoLists.slice.ts ~ line 13 ~ initialState", initialState)
const todoListsSlice = createSlice({
  name: 'userLists',
  initialState,
  reducers: {
    updateTodoLists,
    addNewList
  }
});

export const { actions: todoListsActions } = todoListsSlice;
export default todoListsSlice.reducer; 