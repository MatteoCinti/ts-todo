import { Dispatch, SetStateAction } from "react";
import { IUserState } from "../../state/user/user.interfaces";

export interface FormProps { 
  ariaLabel: string;
  cssClass: string;
  children: JSX.Element[] | JSX.Element;
  toggleEditMode?: React.Dispatch<React.SetStateAction<React.FormEvent>>;
  isLoginOrRegister: "Login" | "Register";
  state: IUserState;
}
