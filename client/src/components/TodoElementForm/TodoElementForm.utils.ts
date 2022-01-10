import { ITodo } from "../../state/todoObjects/todoObjects.interfaces"
import { ITodoListsHandleSubmit } from "../Form/Form.interfaces"



export const handleSubmit = (props: ITodoListsHandleSubmit<ITodo>): void => {
  const { e, dispatch, formState, setFormState, username } = props;
  e.preventDefault();
  console.log('SUBMIT')
}