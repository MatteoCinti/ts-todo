import { createSlice } from '@reduxjs/toolkit';
import { getPersistedState } from '../utils/utils';
import { emptyUserState } from './user.interfaces';
import { handleLogin, logOut } from './user.reducers';

const persistedState = getPersistedState();
const initialState = persistedState && persistedState.user
  ? persistedState.user
  : emptyUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut,
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        const loggedInUserState = {
          ...action.payload,
          isLoggedIn: true,
        };
        return loggedInUserState;
      })
      .addCase(handleLogin.rejected, (state, action) => ({
        ...emptyUserState,
        error: true,
        errorMessage: action.error.message,
      }));
  },
});

export const { actions: userActions } = userSlice;
export default userSlice.reducer;
