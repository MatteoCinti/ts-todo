import React from 'react';
import { socket } from '../../../sockets';
import { ADD_TODO_OBJECT } from '../../../sockets/actions';
import { ISingleList, ITodo, subtaskElementTemplate, todoElementTemplate } from '../../../state/todoLists/todoLists.interfaces';
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

const setTodoParent = (
  formState: ITodo,
  parentTodoId: string
) => {
  return { 
    ...formState,
    parent: parentTodoId
  }
}

export const handleSubmit = (props: IDisplayedTodosHandleSubmit): void => {
  const {
    e, formState, setFormState, username, selectedList, parentTodoId

  } = props;
  e.preventDefault();
  if (formState.state !== 'singleTodo') {
    throw new Error('Wrong Params Passed to Function');
  }

  const listId = selectedList && selectedList['_id'] || 'No List Selected';
  let todoObject = setIndexedTodo(formState, selectedList);
  
  if(formState.role === 'subtask' && parentTodoId) {
    todoObject = setTodoParent(todoObject, parentTodoId);
  }
  const message = {
    username,
    listId,
    todoObject,
  };
  socket.emit(ADD_TODO_OBJECT, message);
  
  if(formState.role === 'subtask') {
    return setFormState(subtaskElementTemplate);
  }
  return setFormState(todoElementTemplate);
};
