import { NavigateFunction } from 'react-router-dom';
import { useGetListById } from '../../customHooks/useFilterTodos';
import { socket } from '../../sockets';
import { USER_LISTS_UPDATE, USER_LIST_DELETE } from '../../sockets/actions';
import { ISingleList, ITodo, ITodoLists } from '../../state/todoLists/todoLists.interfaces';
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
  const message = {
    username,
    listId,
  };
  socket.emit(USER_LIST_DELETE, message);
};

const sumPrices = (
  items: ITodo[], 
  prop: string
) => {
  return items.reduce((a: any, b: any) => {
      return a + Number(b[prop]);
  }, 0);
};

export const getAccumulatedListBudget = (listId: string | undefined) => {
  if(!listId) { return };
  const thisList = useGetListById(listId);

  if(!thisList) { return };
  const { todos } = thisList;
  return sumPrices(todos, 'price')
}
