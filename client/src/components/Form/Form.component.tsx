import React, { Children, cloneElement, useState } from 'react';
import { useAppDispatch } from '../../state/hooks';
import { FormProps } from './Form.interfaces';
import {ReactComponent as Create} from '../../images/Create.svg';

import './Form.styles.scss'
import { useNavigate, useParams } from 'react-router-dom';

const Form = ({ 
  ariaLabel, cssClass, children, svg, isLoginOrRegister, state, buttonValue, handleSubmit
}: FormProps) => {
  const [formState, setFormState] = useState(state);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { username } = useParams();
  
  const childrenWithExtraProp = Children.map(children, child => (
    cloneElement(child, { todoState: [formState, setFormState] })
  ));

  return (
    <form 
      id={ariaLabel} 
      className={`form ${cssClass}`} 
      aria-label={ariaLabel} 
      onSubmit={(e) => handleSubmit({
        e, dispatch, isLoginOrRegister, setFormState, formState, navigate, username
      })}
    > 
      {childrenWithExtraProp}
      <label className={svg && `${cssClass}__submit`}>
        <input
          type="submit"
          className={`form__submit ${cssClass}__submit ${svg && 'hidden'}`}
          name={cssClass}
          value={buttonValue && buttonValue}
        />
        {svg && <Create className='create' />}
      </label>
    </form>
  );
};

export default Form;