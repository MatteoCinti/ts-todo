import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './user.interfaces';
import { handleLogin, setNewUser } from './user.reducers';


export const initialUserState: IUserState = {
  username: '',
  password: '',
  isLoggedIn: false,
  error: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setNewUser
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        console.log('Fulfilled')
        return {
          ...action.payload,
          isLoggedIn: true
        };
      })
      .addCase(handleLogin.rejected, (state, action) => ({
          ...initialUserState,
          error: true,
          errorMessage: 'Username already exists'
      }))
  }
});

export const { actions: userActions } = userSlice;
export default userSlice.reducer;