import React from 'react';
import { userFormHandleSubmit } from '../Form/Form.utils';
import { IUserState, RegisterLogin } from '../../state/user/user.interfaces';
import Form from '../Form/Form.component';
import TextInput from '../TextInput/TextInput.component';

interface ILoginRegisterForm {
  logOrRegister: RegisterLogin;
  userState: IUserState;
}

const LoginRegisterForm: React.FC<ILoginRegisterForm> = ({
  logOrRegister,
  userState,
}) => {
  const { error } = userState;

  return (
    <Form
      ariaLabel="user-form"
      cssClass="user-form"
      isLoginOrRegister={logOrRegister}
      state={userState}
      buttonValue={logOrRegister}
      handleSubmit={userFormHandleSubmit}
    >
      <TextInput
        type="text"
        name="username"
        cssClass="user-form"
        innerText="Enter Your Username"
      />
      <TextInput
        type="password"
        name="password"
        cssClass="user-form"
        innerText="Enter Your Password"
      />
      <>
        {error && <p className="user-form__error">{userState.errorMessage}</p>}
      </>
    </Form>
  );
};

export default LoginRegisterForm;
