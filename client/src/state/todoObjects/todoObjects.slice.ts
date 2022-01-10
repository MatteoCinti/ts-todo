import { createSlice } from "@reduxjs/toolkit";
import { ETaskSubtask, IDisplayedTodoState, ITodo } from "./todoObjects.interfaces";

export const emptyTodoState: IDisplayedTodoState = {
  state: 'todosCollection',
  todos: []
}

export const todoElementTemplate: ITodo = {
  state: 'singleTodo',
  name: '',
  isCompleted: false,
  index: 0,
  role: ETaskSubtask.task
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