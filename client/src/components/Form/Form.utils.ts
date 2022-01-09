import { ISingleList, ITodoLists } from '../../state/todoLists/todoLists.interfaces';
import { IUserState, RegisterLogin } from '../../state/user/user.interfaces'
import { handleLogin } from '../../state/user/user.reducers';
import { emptyUserState } from "../../state/user/user.slice";
import { IUserHandleSubmit, ITodoListsHandleSubmit } from './Form.interfaces';
import { socket } from '../../sockets';
import { addNewList } from '../../state/todoLists/todoLists.reducers';
import { emptySingleList } from '../TodoLists/TodoLists.component';

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
    console.log('qwfdqfqjwfpojqwpofj', newUserBody);
    if(newUserBody.state === 'user') {
      dispatch(handleLogin({...newUserBody, navigate}));
    }
  }

  setFormState(emptyUserState);
};

export const listsFormHandleSubmit = (props: ITodoListsHandleSubmit<ISingleList>): void => {
  const { e, dispatch, isLoginOrRegister, formState, setFormState, navigate, username } = props;
  e.preventDefault();
  if(formState.state !== 'singleList') {
    throw new Error('Wrong Params Passed to Function');
  }
  dispatch(addNewList({...formState, username}));
  setFormState(emptySingleList);
}


