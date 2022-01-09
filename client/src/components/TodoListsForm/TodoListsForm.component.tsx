import { useAppSelector } from "../../state/hooks";
import { ISingleList } from "../../state/todoLists/todoLists.interfaces";
import Form from "../Form/Form.component";
import { listsFormHandleSubmit } from '../Form/Form.utils';
import TextInput from "../TextInput/TextInput.component";

interface ITodoFormProps { 
  listsState: ISingleList;
}

const TodoListsForm: React.FC<ITodoFormProps> = ({
  listsState
}) => {
  
  return (
    <Form
      ariaLabel='todo-lists-form'
      cssClass='todo-lists-form'
      state={listsState}
      svg={true}
      handleSubmit={listsFormHandleSubmit}
    >
      <TextInput 
        type='text'
        name='name'
        cssClass='todo-lists-form'
        innerText='New List Name' 
      />
    </Form>
  )
}

export default TodoListsForm;