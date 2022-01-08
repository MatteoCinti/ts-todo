import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserNamePassword, IUserState } from "./user.interfaces";

export const createNewUser = createAsyncThunk (
  'users/createNewUser',
  async (payload: IUserNamePassword, thunkAPI) => {
    const uri = process.env.REACT_APP_HOST
    const userObject = {
      username: payload.username,
      password: payload.password,
    };

    const response = await fetch(`${uri}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(userObject)
    });

    if(response.status === 409) {
      throw new Error('User already exists')
    }

    const parsedNewUser = await response.json();
    return parsedNewUser;
  }
);

export const setNewUser: CaseReducer<IUserState, PayloadAction<IUserNamePassword>> = (state, action) => ({
  username: action.payload.username,
  password: action.payload.password,
  isLoggedIn: true,
  error: false
});
