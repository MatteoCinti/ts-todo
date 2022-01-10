import { IUserState, RegisterLogin } from '../../state/user/user.interfaces'
import { handleLogin } from '../../state/user/user.reducers';
import { emptyUserState } from "../../state/user/user.slice";
import { IUserHandleSubmit, ITodoListsHandleSubmit } from './Form.interfaces';


export const userFormHandleSubmit = (props: IUserHandleSubmit<IUserState>): void => {
  const {e, dispatch, isLoginOrRegister, formState, setFormState, navigate} = props;
  e.preventDefault();
  
  if( isLoginOrRegister === RegisterLogin.register ) {
    const newUserBody = {
      ...formState,
      request: RegisterLogin.register
    }
    if(newUserBody.state === 'user') {
      dispatch(handleLogin({...newUserBody, navigate}));
    }
  }
  if(isLoginOrRegister === RegisterLogin.login) {
    const newUserBody = {
      ...formState,
      request: RegisterLogin.login
    }
    if(newUserBody.state === 'user') {
      dispatch(handleLogin({...newUserBody, navigate}));
    }
  }

  setFormState(emptyUserState);
};

