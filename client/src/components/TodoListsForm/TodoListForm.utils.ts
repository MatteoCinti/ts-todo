import { addNewList } from '../../state/todoLists/todoLists.reducers';
import { ISingleList } from '../../state/todoLists/todoLists.interfaces';
import { ITodoListsHandleSubmit } from '../Form/Form.interfaces';
import { emptySingleList } from '../SidebarTodoLists/SidebarTodoLists.component';

export const handleSubmit = (props: ITodoListsHandleSubmit<ISingleList>): void => {
  const { e, dispatch, formState, setFormState, username } = props;
  e.preventDefault();
  if(formState.state !== 'singleList') {
    throw new Error('Wrong Params Passed to Function');
  }
  dispatch(addNewList({...formState, username}));
  setFormState(emptySingleList);
}