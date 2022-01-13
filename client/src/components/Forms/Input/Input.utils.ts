import { Map } from './Input.interfaces';

export const hidePassword = (
  todoValue: Map, 
  setTodoValue: React.Dispatch<React.SetStateAction<object>> | undefined
) => {
  const password = Object.keys(todoValue).find((key) => key === 'password');
  if (password && setTodoValue) {
    setTodoValue((todoValue) => ({
      ...todoValue,
      password: '',
    }));
  }
};

export const setIsEmptyInput = (
  todoValue: Map,
  name: string, 
  setIsEmpty: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (todoValue[name] !== '' && todoValue[name]) {
    setIsEmpty(false);
  }
  if (todoValue[name] === '' || !todoValue[name]) {
    setIsEmpty(true);
  }
}

export const handleChange = (
  e: React.FormEvent<HTMLInputElement>,
  name: string,
  setTodoValue: React.Dispatch<React.SetStateAction<object>> | undefined
) => {
  e.preventDefault();
  const element = e.currentTarget as HTMLInputElement;
  const { value } = element;

  setTodoValue && setTodoValue((oldState: object) => ({
    ...oldState,
    [name]: value,
  }));
};