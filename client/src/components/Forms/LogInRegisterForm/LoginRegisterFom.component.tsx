import React from 'react';
import { userFormHandleSubmit } from '../Form/Form.utils';
import { IUserState, RegisterLogin } from '../../../state/user/user.interfaces';
import Form from '../Form/Form.component';
import Input from '../Input/Input.component';
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
      <Input
        type="text"
        name="username"
        cssClass="user-form"
        innerText="Enter Your Username"
      />
      <Input
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
