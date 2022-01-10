import { ITodo } from "../../state/todoObjects/todoObjects.interfaces"
import { todoElementTemplate } from "../../state/todoObjects/todoObjects.slice";
import { IDisplayedTodosHandleSubmit } from "../Form/Form.interfaces"

export const handleSubmit = (props: IDisplayedTodosHandleSubmit<ITodo>): void => {
  const { e, dispatch, formState, setFormState, username, listId } = props;
  e.preventDefault();
  if(formState.state !== 'singleTodo') {
    throw new Error('Wrong Params Passed to Function');
  }
  console.log('SUBMIT');
  // dispatch(addNewTodo({...formState, username, listId}));
  setFormState(todoElementTemplate);
}