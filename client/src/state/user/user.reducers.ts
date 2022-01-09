import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUserState, IUserRequest } from "./user.interfaces";
import { emptyUserState } from './user.slice';

export const handleLogin = createAsyncThunk (
  'users/handleLogin',
  async (payload: IUserRequest, thunkAPI) => {
    const uri = process.env.REACT_APP_HOST;
    const { request, navigate } = payload;
    const userObject = {
      username: payload.username,
      password: payload.password,
    };

    const response = await fetch(`${uri}/api/users/${request.toLowerCase()}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify(userObject)
    });

    if(response.status === 404) {
      throw new Error('User & password combination not found')
    }
    if(response.status === 409) {
      throw new Error('User already exists')
    }

    const parsedNewUser = await response.json();
    navigate(`/${parsedNewUser._id}/lists`);
    return parsedNewUser;
  }
);

export const logOut: CaseReducer<IUserState> = (state) => {
  const persistedState = JSON.parse(localStorage.getItem('justDoItState') || '{}');    
  const localStorageState = {
    ...persistedState,
    user: emptyUserState
  }
  localStorage.setItem("justDoItState", JSON.stringify(localStorageState));
  return ({
    ...emptyUserState
})};
