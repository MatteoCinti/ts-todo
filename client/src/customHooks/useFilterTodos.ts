import { useAppSelector } from "../state/hooks";
import { ISingleList } from "../state/todoLists/todoLists.interfaces";
import { partitionArray } from "../state/utils/utils";


const filterIfCompleted = (
  list: ISingleList | undefined, 
  hideCompleted: boolean
) => {
  if(!list) { return }
  
  const filteredTodos = list.todos.filter(todo => !todo.isCompleted)
  const updatedList = {
    ...list,
    todos: filteredTodos
  }

  return hideCompleted
    ? updatedList
    : list

};

const sortByIndex = (list: ISingleList | undefined) => {
  if(!list) { return };
  const todos = [...list.todos];
  const sortedTodos = todos.sort((a,b) => a.index - b.index);
  return { 
    ...list,
    todos: sortedTodos
  }
}



export const useFilterSelectedList = () => {
  const list =  useAppSelector((state) => state.todoLists.todoLists) || [];
  return list.find((todoList: ISingleList) => todoList.isSelected);
}

export const useFindCompletedUncompletedTodos = () => {
  const { todos } = useFilterSelectedList();
  return partitionArray(todos, (todo) => todo.isCompleted);
}

const useFilterTodos = (hideCompleted:boolean)=> {
  const selectedList = useFilterSelectedList();
  const filteredByCompleted = filterIfCompleted(selectedList, hideCompleted);
  const sortedList = sortByIndex(filteredByCompleted);
  return sortedList;
}

export default useFilterTodos;