import React, { useEffect, useState } from 'react';
import { TextInputProps } from './TextInput.interfaces';
import { handleChange, hidePassword, setIsEmptyInput } from './TextInput.utils';
import './TextInput.styles.scss';

const TextInput: React.FC<TextInputProps> = ({
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
    <div className="text-input">
      <input
        aria-labelledby={name}
        type={type}
        name={name}
        className={`text-input__input ${cssClass}__input`}
        value={todoValue && todoValue[name]}
        onChange={e => handleChange(e, name, setTodoValue)}
        required
      />
      <label
        id={name}
        htmlFor={name}
        className={`
          ${cssClass}__label 
          text-input__label
          ${!isEmpty && 'shrink'}
        `}
      >
        {innerText}
      </label>
    </div>
  );
};

export default TextInput;
