import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import socket from '../../sockets';
import { FETCH_USER_DATA } from '../../sockets/actions';
import { saveToLocalStorage } from '../utils/utils';
import { IUserState, IUserRequest } from "./user.interfaces";
import { emptyUserState } from './user.slice';

export const handleLogin = createAsyncThunk (
  'users/handleLogin',
  async (payload: IUserRequest, thunkAPI) => {
    try {
      const uri = process.env.REACT_APP_HOST;
      const { request, navigate } = payload;
      const userObject = {
        username: payload.username,
        password: payload.password,
      };

      const url = `${uri}/api/users/${request.toLowerCase()}`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
          body: JSON.stringify(userObject)
      };
      const response = await fetch(url, options);
  
      if(response.status === 401) {
        throw new Error('User & password combination not found')
      }
      if(response.status === 409) {
        throw new Error('User already exists')
      }
  
      const parsedNewUser = await response.json();
      delete parsedNewUser.todoLists;
      const userState = {
        state: 'user',
        ...parsedNewUser
      }
      saveToLocalStorage('user', userState);
      navigate(`/${userObject.username}/lists`);
      return parsedNewUser;
    } catch (error) {
      throw error;
    }
  }
);

export const logOut: CaseReducer<IUserState> = (state) => {
  localStorage.setItem("justDoItState", JSON.stringify({}));
  return ({
    ...emptyUserState
  })
};
