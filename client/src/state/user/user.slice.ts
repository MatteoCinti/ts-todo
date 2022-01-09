import { createSlice } from '@reduxjs/toolkit';
import { getPersistedState, saveToLocalStorage } from '../utils/utils';
import { IUserState } from './user.interfaces';
import { handleLogin, logOut } from './user.reducers';

export const emptyUserState: IUserState = {
  state: 'user',
  username: '',
  password: '',
  isLoggedIn: false,
  error: false
}

const persistedState = getPersistedState();
console.log("🚀 ~ file: user.slice.ts ~ line 15 ~ persistedState", persistedState)

const initialState = persistedState 
                      ? persistedState.user
                      : emptyUserState
console.log("🚀 ~ file: user.slice.ts ~ line 18 ~ initialState", initialState)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        const loggedInUserState = {
          ...action.payload,
          isLoggedIn: true
        }
        return loggedInUserState;
      })
      .addCase(handleLogin.rejected, (state, action) =>  ({
          ...emptyUserState,
          error: true,
          errorMessage: action.error.message
        })
      )
  }
});

export const { actions: userActions } = userSlice;
export default userSlice.reducer;