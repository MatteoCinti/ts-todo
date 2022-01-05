import React, { Children, cloneElement, useState, ReactElement, PropsWithChildren } from 'react';
import { useAppDispatch } from '../../state/hooks';
import utils from './Form.utils';

interface Map {
  [key: string]: string | boolean | number | undefined;
}

interface FormProps { 
  ariaLabel: string;
  cssClass: string;
  stateKey: string;
  setStateFunction: keyof typeof utils;
  children: JSX.Element[] | JSX.Element;
  toggleEditMode?: React.Dispatch<React.SetStateAction<React.FormEvent>>;
  elementState: Map;
}

const emptyTextInput = {
  title: '',
  body: '',
  category: 'no category',
  username: ''
};

const Form = ({ 
  ariaLabel, cssClass, stateKey, setStateFunction, children, toggleEditMode, elementState 
} : FormProps) => {
  const [inputValue, setInputValue] = useState(elementState);
  const dispatch = useAppDispatch();

  const handleSubmit = ((e: React.FormEvent) => {
    e.preventDefault();
    utils[setStateFunction](inputValue[stateKey], dispatch);
    // utils.addCategory(inputValue.category, useAppDispatch)
    toggleEditMode && toggleEditMode(e);
    setInputValue(emptyTextInput);
  });

  const childrenWithExtraProp = Children.map(children, child => (
    cloneElement(child, { todoState: [inputValue, setInputValue] })
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
        // value={cssClass.replace('-', ' ')} 
      />
    </form>
  );
};

export default Form;