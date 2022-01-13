import { NavigateFunction } from 'react-router-dom';
import { socket } from '../../sockets';
import { USER_LISTS_UPDATE, USER_LIST_DELETE } from '../../sockets/actions';
import { ISingleList, ITodoLists } from '../../state/todoLists/todoLists.interfaces';
import { selectCorrectList, unselectAllLists } from '../../state/todoLists/todoLists.utils';

const getSelectedList = ( 
  listId: string | undefined,
  state: ITodoLists,
) => {
  const { todoLists } = state;
  return todoLists.find((list: ISingleList) => list._id === listId);
}

export const handleSelectClick = (
  username: string,
  listId: string | undefined,
  state: ITodoLists,
  navigate: NavigateFunction,
) => {
  const selectedList = getSelectedList(listId, state);
  if (!selectedList) { return false; }

  const unselectedLists = unselectAllLists(state);
  const updatedState = selectCorrectList(unselectedLists, listId);
  const message = {
    username,
    todoLists: updatedState,
  };
  navigate(`/${username}/lists/${selectedList.name}`);
  socket.emit(USER_LISTS_UPDATE, message);
};

export const handleDeleteClick = (
  username: string,
  listId: string | undefined,
  state: ITodoLists,
) => {
  console.log("🚀 ~ file: ListItem.utils.ts ~ line 32 ~ state", state)
  const message = {
    username,
    listId,
  };
  socket.emit(USER_LIST_DELETE, message);
};
