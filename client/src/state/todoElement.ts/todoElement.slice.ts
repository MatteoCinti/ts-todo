import { createSlice } from "@reduxjs/toolkit";
import { getPersistedState } from "../utils/utils";
import { ISingleTodoState } from "./todoElement.interfaces";

const emptyTodoState: ISingleTodoState = {
  state: 'todos',
  todos: []
}

// const persistedState = getPersistedState();
// const initialState = persistedState
//                       ? persistedState.todoLists
//                       : emptyTodoListsState

const todoListsSlice = createSlice({
  name: 'userLists',
  initialState: emptyTodoState,
  reducers: {}
});

export const { actions: todoListsActions } = todoListsSlice;
export default todoListsSlice.reducer;