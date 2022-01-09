import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './user.interfaces';
import { handleLogin, logOut } from './user.reducers';


export const emptyUserState: IUserState = {
  _id: '',
  state: 'user',
  username: '',
  password: '',
  isLoggedIn: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: emptyUserState,
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
        const persistedState = JSON.parse(localStorage.getItem('justDoItState') || '{}');    
        const localStorageState = {
          ...persistedState,
          user: loggedInUserState
        }
        localStorage.setItem("justDoItState", JSON.stringify(localStorageState));
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