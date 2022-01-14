import { useAppSelector } from "../state/hooks";
import { ISingleList, ITodo } from "../state/todoLists/todoLists.interfaces";
import { partitionArray } from "../state/utils/utils";


const filterIfCompleted = (
  list: ISingleList | undefined, 
  hideCompleted: boolean
) => {
  if(!list || !list.todos) { return }
  const tasks = list.todos.filter(todo => todo.role === 'task');
  const filteredTasks = tasks.filter(todo => !todo['isCompleted']);
  return {
    ...list,
    todos: hideCompleted 
            ? filteredTasks
            : tasks
  }
};

export const useGetSubtasks = (
  list: ISingleList | undefined,
  todoId: string | undefined
) => {
  if(!list || !todoId) { return };
  const subtasks = list.todos.filter(todo => todo.role === 'subtask');
  const filteredSubtasks = subtasks.filter(subtask => subtask.parent === todoId);
  const orderedSubTasks = sortByIndex({...list, todos: filteredSubtasks});
  if(!orderedSubTasks) { return };
  return orderedSubTasks.todos;
}

const sortByIndex = (list: ISingleList | undefined) => {
  if(!list) { return };
  const todos = [...list.todos];
  const sortedTodos = todos.sort((a,b) => a.index - b.index);
  return { 
    ...list,
    todos: sortedTodos
  }
};

export const useGetListById = (listId: string) => {
  const lists: ISingleList[] | [] = useAppSelector((state) => state.todoLists.todoLists) || [];
  return lists.find(list => list['_id'] === listId);
};

export const useFilterSelectedList = () => {
  const list = useAppSelector((state) => state.todoLists.todoLists) || [];
  return list.find((todoList: ISingleList) => todoList['isSelected']);
};

export const useFindCompletedUncompletedTodos = () => {
  const { todos } = useFilterSelectedList();
  const tasks = todos.filter((todo: ITodo) => todo.role === 'task')
  return partitionArray(tasks, (todo) => todo.isCompleted && todo.role === 'task');
};

const useFilterTodos = (hideCompleted:boolean)=> {
  const selectedList = useFilterSelectedList();
  const filteredByCompleted = filterIfCompleted(selectedList, hideCompleted);
  const sortedList = sortByIndex(filteredByCompleted);
  return sortedList;
};

export default useFilterTodos;