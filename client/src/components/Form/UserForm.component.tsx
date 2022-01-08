import React, { Children, cloneElement, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { RegisterLogin } from '../../state/user/user.interfaces';
import { handleLogin } from '../../state/user/user.reducers';
import { initialUserState } from '../../state/user/user.slice';
import { FormProps } from './Form.interfaces';

import './Form.styles.scss'
import utils from './Form.utils';

const UserForm = ({ 
  ariaLabel, cssClass, children, toggleEditMode, isLoginOrRegister, state, buttonValue
} : FormProps) => {
  const getState = useAppSelector(state => state.user);
  const [formState, setFormState] = useState(state);
  const dispatch = useAppDispatch();
  
  const handleSubmit = ((e: React.FormEvent) => {
    e.preventDefault();
    if( isLoginOrRegister === RegisterLogin.register ) {
      const newUserBody = {
        ...formState,
        request: RegisterLogin.register
      }
      dispatch(handleLogin(newUserBody));
    }
    if(isLoginOrRegister === RegisterLogin.login) {
      const newUserBody = {
        ...formState,
        request: RegisterLogin.login
      }
      dispatch(handleLogin(newUserBody));
    }
    // utils[setStateFunction](user, dispatch);
    // utils.addCategory(inputValue.category, useAppDispatch)
    setFormState(state);
    toggleEditMode && toggleEditMode(e);
  });

  const childrenWithExtraProp = Children.map(children, child => (
    cloneElement(child, { todoState: [formState, setFormState] })
  ));

  return (
    <form 
      id={ariaLabel} 
      className={`form ${cssClass}`} 
      aria-label={ariaLabel} 
      onSubmit={handleSubmit}
    > 
      {childrenWithExtraProp}
      <input
        type="submit"
        className={`form__submit ${cssClass}__submit`}
        name={cssClass}
        value={buttonValue}
      />
    </form>
  );
};

export default UserForm;