import { Dispatch, SetStateAction } from "react";
import { IUserState, RegisterLogin } from "../../state/user/user.interfaces";

export interface FormProps { 
  ariaLabel: string;
  cssClass: string;
  children: JSX.Element[] | JSX.Element;
  toggleEditMode?: React.Dispatch<React.SetStateAction<React.FormEvent>>;
  state: IUserState;
  buttonValue: string;
  isLoginOrRegister?: RegisterLogin;
}
