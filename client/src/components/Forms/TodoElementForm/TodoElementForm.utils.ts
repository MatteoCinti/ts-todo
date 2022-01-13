import React from 'react';
import { socket } from '../../../sockets';
import { ADD_TODO_OBJECT } from '../../../sockets/actions';
import { ITodo, todoElementTemplate } from '../../../state/todoLists/todoLists.interfaces';
import { IDisplayedTodosHandleSubmit } from '../Form/Form.interfaces';

export const handleSubmit = (props: IDisplayedTodosHandleSubmit): void => {
  const {
    e, formState, setFormState, username, listId,
  } = props;
  e.preventDefault();
  if (formState.state !== 'singleTodo') {
    throw new Error('Wrong Params Passed to Function');
  }

  const message = {
    username,
    listId,
    todoObject: formState,
  };

  socket.emit(ADD_TODO_OBJECT, message);
  setFormState(todoElementTemplate);
};
