import { ITodoLists } from "./todoLists.interfaces";

export const unselectAllLists = (state: ITodoLists): ITodoLists => {
  const { todoLists } = state;
  const unselectedLists = todoLists.map(list => {
    if(list.isSelected) {
      return {
        ...list,
        isSelected: false
      }
    }
    return list;
  })
  return {
    ...state, 
    todoLists: unselectedLists
  };
}

export const selectCorrectList = (
  state: ITodoLists,
  _id: string | undefined
) : ITodoLists => {
  const { todoLists } = state;
  const updatedLists = todoLists.map((list) => {
    if(list._id === _id) {
      return { 
        ...list,
        isSelected: true
      }
    }
    return list
  })
  return {
    ...state,
    todoLists: updatedLists
  }
}