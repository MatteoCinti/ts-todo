import React from 'react';
import { ISingleList, ITodo } from '../../../state/todoLists/todoLists.interfaces';
import Form from '../Form/Form.component';
import { handleSubmit } from './TodoItemForm.utils';
import Input from '../Input/Input.component';
import './TodoItemForm.styles.scss';

interface ITodoFormProps {
  todoElementTemplate: ITodo;
  selectedList: ISingleList;
}

const TodoItemForm: React.FC<ITodoFormProps> = ({
  todoElementTemplate,
  selectedList,
}) => {
  
  
  return (
    <Form 
      ariaLabel="todo-elements-form"
      cssClass="todo-elements-form"
      state={todoElementTemplate}
      svg
      handleSubmit={handleSubmit}
      selectedList={selectedList}
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
