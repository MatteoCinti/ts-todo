import React, { useEffect, useState } from 'react';

import './TextInput.styles.scss';

interface Map {
  [key: string]: string |undefined
}

interface TextInputProps {
  type: string;
  name: string;
  innerText: string;
  cssClass: string;
  todoState?: [Map, React.Dispatch<React.SetStateAction<object>>];
}


const TextInput: React.FC<TextInputProps> = ({
  type, name, innerText, todoState, cssClass,
}) => {
  const [todoValue, setTodoValue] = todoState || [{}];
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const password = Object.keys(todoValue).find(key => key === 'password');
    if(password && setTodoValue) {
      setTodoValue(todoValue => ({
          ...todoValue,
          password: ''
        }));
    }
  }, [])

  useEffect(() => {
    if(todoValue[name] !== '' && todoValue[name]) {
      setIsEmpty(false);
    }
    if(todoValue[name] === '' || !todoValue[name]) {
      setIsEmpty(true);
    }
  }, [todoValue]);
  
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLInputElement;
    const { value } = element;
    
    setTodoValue && setTodoValue((oldState: object) => ({
      ...oldState,
      [name]: value,
    }));
  };

  return (
    <div className="text-input">
       <input
        aria-labelledby={name}
        type={type}
        name={name}
        className={`text-input__input ${cssClass}__input`}
        value={todoValue && todoValue[name]}
        onChange={handleChange}
        required 
      />
      <label 
        id={name} 
        htmlFor={name} 
        className={`
          ${cssClass}__label 
          text-input__label
          ${ !isEmpty && 'shrink'}
        `}
      >
        {innerText}
      </label>
    </div>
  );
};

export default TextInput;