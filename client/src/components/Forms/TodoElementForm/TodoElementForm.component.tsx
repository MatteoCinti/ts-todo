import React from 'react';
import { ITodo } from '../../../state/todoLists/todoLists.interfaces';
import Form from '../Form/Form.component';
import { handleSubmit } from './TodoElementForm.utils';
import TextInput from '../TextInput/TextInput.component';
import './TodoElementForm.styles.scss';

interface ITodoFormProps {
  todoElementTemplate: ITodo;
  listId: string;
}

const TodoElementForm: React.FC<ITodoFormProps> = ({
  todoElementTemplate,
  listId,
}) => (
  <Form
    ariaLabel="todo-elements-form"
    cssClass="todo-elements-form"
    state={todoElementTemplate}
    svg
    handleSubmit={handleSubmit}
    listId={listId}
  >
    <TextInput
      type="text"
      name="name"
      cssClass="todo-elements-form"
      innerText="New Todo Name"
    />
  </Form>
);

export default TodoElementForm;
