import React from 'react';
import { ISingleList, ITodo, subtaskElementTemplate, todoElementTemplate } from '../../../state/todoLists/todoLists.interfaces';
import Form from '../Form/Form.component';
import { handleSubmit } from './TodoItemForm.utils';
import Input from '../Input/Input.component';
import './TodoItemForm.styles.scss';

interface ITodoFormProps {
  selectedList: ISingleList;
  parentTodoId?: string;
  role: string;
}

const TodoItemForm: React.FC<ITodoFormProps> = ({
  selectedList,
  parentTodoId,
  role,
}) => {
  
  return (
    <Form 
      ariaLabel="todo-elements-form"
      cssClass="todo-elements-form"
      state={
        role === 'task' 
        ? todoElementTemplate
        : subtaskElementTemplate
      }
      svg
      handleSubmit={handleSubmit}
      selectedList={selectedList}
      parentTodoId={parentTodoId}
    >
      <Input
        type="text"
        name="name"
        cssClass="todo-elements-form"
        innerText="New Todo Name"
      />
      <Input
        type="number"
        name="price"
        cssClass="todo-elements-form"
        innerText="Price"
      />
    </Form>
)};

export default TodoItemForm;
