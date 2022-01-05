import React from 'react';

interface Map {
  [key: string]: string | undefined
}

interface TextInputProps {
  type: string;
  name: string;
  placeholder: string;
  cssClass: string;
  todoState?: [Map, React.Dispatch<React.SetStateAction<object>>];
}


const TextInput: React.FC<TextInputProps> = ({
  type, name, placeholder, todoState, cssClass,
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
    <>
      <label 
        id={name} 
        htmlFor={name} 
        className="form__label hidden"
      >
        {placeholder}
      </label>
      <input
        aria-labelledby={name}
        type={type}
        name={name}
        className={`${cssClass}__input`}
        placeholder={placeholder}
        value={todoValue && todoValue[name]}
        onChange={handleChange}
        required 
      />
    </>
  );
};

export default TextInput;