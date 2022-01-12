import { socket } from '../../sockets';
import { USER_LISTS_UPDATE } from '../../sockets/actions';
import { ITodoLists } from '../../state/todoLists/todoLists.interfaces';
import { partitionArray } from '../../state/utils/utils';

export const handleCompleteClick = (
  username: string,
  todoListsState: ITodoLists,
  todoId?: string,
  listId?: string,
) => {
  const { todoLists } = todoListsState;
  const [list, remainingLists] = partitionArray(todoLists, (todo) => todo._id === listId);
  const [todo, remainingTodos] = partitionArray(list[0].todos, (element) => element._id === todoId);

  const payload: ITodoLists = {
    state: 'todoLists',
    todoLists: [
      ...remainingLists,
      {
        ...list[0],
        todos: [
          ...remainingTodos,
          {
            ...todo[0],
            isCompleted: !todo[0].isCompleted,
          },
        ],
      },
    ],
  };

  const message = {
    username,
    todoLists: payload,
  };
  socket.emit(USER_LISTS_UPDATE, message);
};

export const handleDeleteClick = (
  username: string,
  todoListsState: ITodoLists,
  todoId?: string,
  listId?: string,
) => {
  const { todoLists } = todoListsState;
  const [list, remainingLists] = partitionArray(todoLists, (todo) => todo._id === listId);
  const [_, remainingTodos] = partitionArray(list[0].todos, (todo) => todo._id === todoId);
  const payload: ITodoLists = {
    state: 'todoLists',
    todoLists: [
      ...remainingLists,
      {
        ...list[0],
        todos: [
          ...remainingTodos,
        ],
      },
    ],
  };

  const message = {
    username,
    todoLists: payload,
  };
  socket.emit(USER_LISTS_UPDATE, message);
};
