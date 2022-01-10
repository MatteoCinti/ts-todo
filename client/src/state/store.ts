import { configureStore } from '@reduxjs/toolkit';

import user from './user/user.slice'
import todoLists from './todoLists/todoLists.slice'
import todoObject from './todoObjects/todoObjects.slice';

const persistedState = JSON.parse(localStorage.getItem('justDoItState') || '{}');

export const store = configureStore({
  reducer: {
    user,
    todoLists,
    todos: todoObject
  },
  preloadedState: persistedState
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;