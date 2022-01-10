import { createSlice } from "@reduxjs/toolkit";
import { getPersistedState } from "../utils/utils";
import { ISingleTodoState } from "./todoObjects.interfaces";

const emptyTodoState: ISingleTodoState = {
  state: 'todos',
  todos: []
}

// const persistedState = getPersistedState();
// const initialState = persistedState
//                       ? persistedState.todoLists
//                       : emptyTodoListsState

const listTodosSlice = createSlice({
  name: 'userLists',
  initialState: emptyTodoState,
  reducers: {}
});

export const { actions: todoListsActions } = listTodosSlice;
export default listTodosSlice.reducer;