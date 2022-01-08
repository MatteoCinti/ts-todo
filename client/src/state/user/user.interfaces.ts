export interface IUserNamePassword { 
  username: string;
  password: string;
}

export interface IUserState extends IUserNamePassword{ 
  [key: string]: string | boolean | undefined;
  isLoggedIn: boolean;
  error: boolean;
  errorMessage?: string;
}