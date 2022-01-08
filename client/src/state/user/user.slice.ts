import { createSlice } from '@reduxjs/toolkit';
import { IUserState } from './user.interfaces';
import { createNewUser, setNewUser } from './user.reducers';


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
      .addCase(createNewUser.fulfilled, (state, action) => {
        return {
          ...action.payload,
          isLoggedIn: true
        };
      })
      .addCase(createNewUser.rejected, (state, action) => ({
          ...initialUserState,
          error: true,
          errorMessage: 'Username already exists'
      }))
  }
});

export const { actions: userActions } = userSlice;
export default userSlice.reducer;