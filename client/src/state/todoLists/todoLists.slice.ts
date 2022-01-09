import { createSlice } from "@reduxjs/toolkit";
import { ITodoLists } from "./todoLists.interfaces";

const emptyTodoListsState: ITodoLists = {
  state: "todoLists",
  todoLists: []
}

const todoListsSlice = createSlice({
  name: 'user',
  initialState: emptyTodoListsState,
  reducers: {}
});

export const { actions: todoListsActions } = todoListsSlice;
export default todoListsSlice.reducer;