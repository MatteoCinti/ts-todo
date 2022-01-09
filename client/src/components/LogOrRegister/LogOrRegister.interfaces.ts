import { NavigateFunction } from "react-router-dom";
import { RegisterLogin } from "../../state/user/user.interfaces";

export interface ILRComponentProps { 
  isLoginOrRegister: RegisterLogin;
  setLogOrRegister: React.Dispatch<React.SetStateAction<RegisterLogin>>;
}

export interface ILRHandleClick extends ILRComponentProps {
  navigate: NavigateFunction;
}