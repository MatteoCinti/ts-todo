import { AnyAction } from "@reduxjs/toolkit";
import { NavigateFunction, NavigateOptions, Params, To } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { ISingleList, ITodoLists } from "../../state/todoLists/todoLists.interfaces";
import { ITodo } from "../../state/todoObjects/todoObjects.interfaces";
import { IUserState, RegisterLogin } from "../../state/user/user.interfaces";
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
    | ((props: IUserHandleSubmit<IUserState> ) => void) 
    | ((props: ITodoListsHandleSubmit<ITodoLists>) => void)
    | ((props: IDisplayedTodosHandleSubmit<ITodo>) => void);
  listId?: string;
}
interface IHandleSubmit<T> { 
  e: React.FormEvent,
  formState: 
  | IUserState 
  | ISingleList
  | ITodo
  setFormState: React.Dispatch<React.SetStateAction<IUserState | ISingleList | ITodo>>;
  navigate: NavigateFunction;
}
export interface IUserHandleSubmit<T> extends IHandleSubmit<T> { 
  dispatch:ThunkDispatch<{
      user: T;
    }, null, AnyAction> & ThunkDispatch<{
      user: T;
    }, undefined, AnyAction>,
  isLoginOrRegister?: RegisterLogin,
}

export interface ITodoListsHandleSubmit<T> extends IHandleSubmit<T> { 
  // dispatch: any,
  dispatch:ThunkDispatch<{
    todoLists: T;
  }, null, AnyAction> & ThunkDispatch<{
    todoLists: T;
  }, undefined, AnyAction>,
  isLoginOrRegister?: RegisterLogin;
  username?: string;
}

export interface IDisplayedTodosHandleSubmit<T> extends IHandleSubmit<T> { 
  dispatch:ThunkDispatch<{
    todos: T;
  }, null, AnyAction> & ThunkDispatch<{
    todos: T;
  }, undefined, AnyAction>,
  isLoginOrRegister?: RegisterLogin;
  username?: string;
  listId?: string;
}

