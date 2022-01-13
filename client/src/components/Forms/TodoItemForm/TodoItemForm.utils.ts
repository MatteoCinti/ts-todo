import React from 'react';
import { socket } from '../../../sockets';
import { ADD_TODO_OBJECT } from '../../../sockets/actions';
import { ISingleList, ITodo, todoElementTemplate } from '../../../state/todoLists/todoLists.interfaces';
import { IDisplayedTodosHandleSubmit } from '../Form/Form.interfaces';

const getNextTodoIndex = (selectedList: ISingleList) => selectedList.todos.length;

const setIndexedTodo = (
  formState: ITodo,
  selectedList: ISingleList | undefined,
) => {
  const nextIndex = selectedList ? getNextTodoIndex(selectedList) : 0;
  return {
    ...formState,
    index: nextIndex,
  }
}

export const handleSubmit = (props: IDisplayedTodosHandleSubmit): void => {
  const {
    e, formState, setFormState, username, selectedList,
  } = props;
  e.preventDefault();
  if (formState.state !== 'singleTodo') {
    throw new Error('Wrong Params Passed to Function');
  }
  const listId = selectedList && selectedList['_id'] || 'No List Selected';
  const todoObject = setIndexedTodo(formState, selectedList);


  const message = {
    username,
    listId,
    todoObject,
  };

  socket.emit(ADD_TODO_OBJECT, message);
  setFormState(todoElementTemplate);
};
