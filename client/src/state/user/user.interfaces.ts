export interface IUserNamePassword { 
  username: string;
  password: string;
}

export interface IUserState extends IUserNamePassword{ 
  [key: string]: string | boolean | undefined;
  _id: string;
  state: 'user';
  isLoggedIn: boolean;
  error: boolean;
  errorMessage?: string;
}

export const enum RegisterLogin {
  register = "Register",
  login = "Login",
}

export interface IUserRequest extends IUserNamePassword {
  request: RegisterLogin.login |  RegisterLogin.register;
  navigate: any;
}