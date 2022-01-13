import React, { useEffect, useState } from 'react';
import { InputProps } from './Input.interfaces';
import { handleChange, hidePassword, setIsEmptyInput } from './Input.utils';
import './Input.styles.scss';

const Input: React.FC<InputProps> = ({
  type, name, innerText, todoState, cssClass,
}) => {
  const [todoValue, setTodoValue] = todoState || [{}];
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    hidePassword(todoValue, setTodoValue);
  }, []);

  useEffect(() => {
    setIsEmptyInput(todoValue, name, setIsEmpty);
  }, [todoValue]);

  return (
    <div className={`${type}-input input`}>
      <input
        aria-labelledby={name}
        type={type}
        name={name}
        className={`input__element ${cssClass}__input`}
        value={todoValue && todoValue[name]}
        onChange={e => handleChange(e, name, setTodoValue)}
        required
      />
      <label
        id={name}
        htmlFor={name}
        className={`
          ${cssClass}__label 
          input__label
          ${!isEmpty && 'shrink'}
        `}
      >
        {innerText}
      </label>
    </div>
  );
};

export default Input;
