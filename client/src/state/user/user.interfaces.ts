import { NavigateFunction } from 'react-router-dom';
import { ITodoLists } from '../todoLists/todoLists.interfaces';

export interface IUser {
  username: string;
  password: string;
  todoLists?: ITodoLists;
}

export interface IUserState extends IUser {
  [key: string]: string | boolean | undefined | ITodoLists;
  _id?: string;
  state: 'user';
  isLoggedIn: boolean;
  error: boolean;
  errorMessage?: string;
}

export const emptyUserState: IUserState = {
  state: 'user',
  username: '',
  password: 'hidden',
  isLoggedIn: false,
  error: false,
};

export const enum RegisterLogin {
  register = 'Register',
  login = 'Login',
}

export interface IUserRequest extends IUser {
  request: RegisterLogin.login | RegisterLogin.register;
  navigate: NavigateFunction;
}
