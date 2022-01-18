import { NavigateFunction } from 'react-router-dom';
import { useGetListById } from '../../customHooks/useFilterTodos';
import { socket } from '../../sockets';
import { USER_LISTS_UPDATE, USER_LIST_DELETE } from '../../sockets/actions';
import { ISingleList, ITodo, ITodoLists } from '../../state/todoLists/todoLists.interfaces';
import { selectCorrectList, unselectAllLists } from '../../state/todoLists/todoLists.utils';
import { partitionArray } from '../../state/utils/utils';
import { sumPrices } from '../TodoItem/TodoItem.utils';

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
) => {
  const selectedList = getSelectedList(listId, state);
  if (!selectedList) { return false; }

  const unselectedLists = unselectAllLists(state);
  const updatedState = selectCorrectList(unselectedLists, listId);
  const message = {
    username,
    todoLists: updatedState,
  };
  socket.emit(USER_LISTS_UPDATE, message);
};

export const handleDeleteClick = (
  username: string,
  listId: string | undefined,
) => {
  const message = {
    username,
    listId,
  };
  socket.emit(USER_LIST_DELETE, message);
};

const getMainTasksBudget = (
  todos: ITodo[],
) : ITodo[] => {
  const [tasks, subtasks] = partitionArray(todos, todo => todo.role === 'task');
  const filteredSubtasks = subtasks.filter((subtask) => {
    return tasks.some((task) => subtask.parent !== task['_id']);
  })
  return [];
}

export const getAccumulatedListBudget = (listId: string | undefined) => {
  if(!listId) { return };
  const thisList = useGetListById(listId);

  if(!thisList) { return };
  const { todos } = thisList;
  getMainTasksBudget(todos)
  return sumPrices(todos, 'price')
}
