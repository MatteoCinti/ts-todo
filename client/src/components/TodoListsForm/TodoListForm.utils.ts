import { addNewList } from '../../state/todoLists/todoLists.reducers';
import { emptySingleList, ISingleList } from '../../state/todoLists/todoLists.interfaces';
import { ITodoListsHandleSubmit } from '../Form/Form.interfaces';
import { selectCorrectList, unselectAllLists } from '../../state/todoLists/todoLists.utils';
import { todoListsActions } from '../../state/todoLists/todoLists.slice';

export const handleSubmit = (props: ITodoListsHandleSubmit<ISingleList>): void => {
  const { e, dispatch, formState, setFormState, username, navigate } = props;
  e.preventDefault();
  if(formState.state !== 'singleList') {
    throw new Error('Wrong Params Passed to Function');
  }
  // console.log("🚀 ~ file: ListItem.utils.ts ~ line 55 ~ unselectedLists", unselectedLists)
  dispatch(todoListsActions.addNewList({...formState, username}));
  navigate(`/app/${username}/lists/${formState.name}`)
  setFormState(emptySingleList);
}