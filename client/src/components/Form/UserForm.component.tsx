import React, { Children, cloneElement, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { createNewUser } from '../../state/user/user.reducers';
import { initialUserState } from '../../state/user/user.slice';
import { FormProps } from './Form.interfaces';
import utils from './Form.utils';

const UserForm = ({ 
  ariaLabel, cssClass, children, toggleEditMode, isLoginOrRegister, state
} : FormProps) => {
  const getState = useAppSelector(state => state.user);
  const [formState, setFormState] = useState(state);
  const dispatch = useAppDispatch();
  
  const handleSubmit = ((e: React.FormEvent) => {
    e.preventDefault();
    const logOrRegister = isLoginOrRegister;
    if(logOrRegister === 'Register') {
      dispatch(createNewUser(formState));
    }
    if(logOrRegister === 'Login') {

    }
    // utils[setStateFunction](user, dispatch);
    // utils.addCategory(inputValue.category, useAppDispatch)
    setFormState(getState);
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
        value='Sing In' 
      />
    </form>
  );
};

export default UserForm;