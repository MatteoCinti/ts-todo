import React from 'react';
import { ISingleList, subtaskElementTemplate } from '../../../state/todoLists/todoLists.interfaces';
import Form from '../Form/Form.component';
import { handleSubmit } from '../TodoItemForm/TodoItemForm.utils';
import Input from '../Input/Input.component';

interface ITodoFormProps {
  selectedList: ISingleList;
  parentTodoId?: string;
}

const SubtaskForm: React.FC<ITodoFormProps> = ({
  parentTodoId
}) => {
  return (
    <Form 
      ariaLabel="subtask-form"
      cssClass="subtask-form"
      state={subtaskElementTemplate}
      svg
      handleSubmit={handleSubmit}
      parentTodoId={parentTodoId}
    >
      <Input
        type="text"
        name="name"
        cssClass="subtask-form"
        innerText="New Todo Name"
      />
      <Input
        type="number"
        name="price"
        cssClass="subtask-form"
        innerText="Price"
      />
    </Form>
)};

export default SubtaskForm;
