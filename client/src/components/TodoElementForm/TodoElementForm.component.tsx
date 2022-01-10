import { ISingleList } from "../../state/todoLists/todoLists.interfaces";
import Form from "../Form/Form.component";
import { handleSubmit } from './TodoElementForm.utils';
import TextInput from "../TextInput/TextInput.component";
import { IDisplayedTodoState, ITodo } from "../../state/todoObjects/todoObjects.interfaces";
import './TodoElementForm.styles.scss'

interface ITodoFormProps { 
  todoElementTemplate: ITodo;
  listId: string;
}

const TodoElementForm: React.FC<ITodoFormProps> = ({
  todoElementTemplate,
  listId
}) => {
  
  return (
    <Form
      ariaLabel='todo-elements-form'
      cssClass='todo-elements-form'
      state={todoElementTemplate}
      svg={true}
      handleSubmit={handleSubmit}
      listId={listId}
    >
      <TextInput 
        type='text'
        name='name'
        cssClass='todo-elements-form'
        innerText='New Todo Name' 
      />
    </Form>
  )
}

export default TodoElementForm;