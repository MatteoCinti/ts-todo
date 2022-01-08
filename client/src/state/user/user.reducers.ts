import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserNamePassword, IUserState, RegisterLogin } from "./user.interfaces";

interface IUserRequest extends IUserNamePassword {
  request: RegisterLogin.login |  RegisterLogin.register;
}


export const handleLogin = createAsyncThunk (
  'users/handleLogin',
  async (payload: IUserRequest, thunkAPI) => {
    const uri = process.env.REACT_APP_HOST
    const userObject = {
      username: payload.username,
      password: payload.password,
    };
    const { request } = payload

    const response = await fetch(`${uri}/api/users/${request.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(userObject)
    });

    if(response.status === 400) {
      throw new Error('User & password combination not found')
    }
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
