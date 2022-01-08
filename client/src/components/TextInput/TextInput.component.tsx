import React from 'react';

import './TextInput.styles.scss';

interface Map {
  [key: string]: string | undefined
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
  
  const [todoValue, setTodoValue] = todoState || [];

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const element = e.currentTarget as HTMLInputElement
    const value = element.value
    
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
        className={`${cssClass}__label text-input__label`}
      >
        {innerText}
      </label>
    </div>
  );
};

export default TextInput;