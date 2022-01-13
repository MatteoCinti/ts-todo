import { AnyAction } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { ISingleList, ITodo, ITodoLists } from '../../../state/todoLists/todoLists.interfaces';
import { IUserState, RegisterLogin } from '../../../state/user/user.interfaces';

export interface FormProps {
  ariaLabel: string;
  cssClass: string;
  children: JSX.Element[] | JSX.Element;
  toggleEditMode?: React.Dispatch<React.SetStateAction<React.FormEvent>>;
  state:
  | IUserState
  | ISingleList
  | ITodo
  buttonValue?: string;
  svg?: true;
  isLoginOrRegister?: RegisterLogin;
  handleSubmit:
  | ((props: IUserHandleSubmit<IUserState>) => void)
  | ((props: ITodoListsHandleSubmit<ITodoLists>) => void)
  | ((props: IDisplayedTodosHandleSubmit) => void);
  listId?: string;
}
interface IHandleSubmit {
  e: React.FormEvent,
  formState:
  | IUserState
  | ISingleList
  | ITodo
  setFormState: React.Dispatch<React.SetStateAction<IUserState | ISingleList | ITodo>>;
  navigate: NavigateFunction;
}
export interface IUserHandleSubmit<T> extends IHandleSubmit {
  dispatch:ThunkDispatch<{
    user: T;
  }, null, AnyAction> & ThunkDispatch<{
    user: T;
  }, undefined, AnyAction>,
  isLoginOrRegister?: RegisterLogin,
}

export interface ITodoListsHandleSubmit<T> extends IHandleSubmit {
  dispatch:ThunkDispatch<{
    todoLists: T;
  }, null, AnyAction> & ThunkDispatch<{
    todoLists: T;
  }, undefined, AnyAction>,
  isLoginOrRegister?: RegisterLogin;
  username?: string;
}

export interface IDisplayedTodosHandleSubmit extends IHandleSubmit {
  isLoginOrRegister?: RegisterLogin;
  username?: string;
  listId?: string;
}
