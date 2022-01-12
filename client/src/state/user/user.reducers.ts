import { CaseReducer, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { saveToLocalStorage } from '../utils/utils';
import { IUserState, IUserRequest } from "./user.interfaces";
import { emptyUserState } from './user.slice';


const parseUserPayload = (payload: IUserRequest) => {
  const uri = process.env.REACT_APP_HOST;
  const userObject = {
    username: payload.username,
    password: payload.password,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
      body: JSON.stringify(userObject)
  };

  return {
    userObject, 
    options,
    uri
  }
}

const parseUserResponse = async (response:Response, ) => {
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

  return { parsedNewUser, userState }
}

export const handleLogin = createAsyncThunk (
  'users/handleLogin',
  async (payload: IUserRequest, thunkAPI) => {
    try {
      const { request, navigate } = payload;
      const { userObject, options, uri} = parseUserPayload(payload);
      
      const url = `${uri}/api/users/${request.toLowerCase()}`;
      const response = await fetch(url, options);
      const { parsedNewUser, userState } = await parseUserResponse(response);

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
