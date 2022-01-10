import { Dispatch } from "@reduxjs/toolkit";
import socket from "../../sockets";
import { USER_LISTS_UPDATE, USER_LIST_DELETE } from "../../sockets/actions";
import { ISingleList, ITodoLists } from "../../state/todoLists/todoLists.interfaces";

const unselectAllLists = (state: ITodoLists): ITodoLists => {
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

const selectCorrectList = (
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

export const handleSelectClick = (
  state: ITodoLists,
  listId: string | undefined,
  username: string,
  // setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { todoLists } = state;
  
  const selectedList = todoLists.find((list: ISingleList) => list._id === listId)
  if (!selectedList) { return false }
  
  const unselectedLists = unselectAllLists(state);
  console.log("🚀 ~ file: ListItem.utils.ts ~ line 55 ~ unselectedLists", unselectedLists)
  const updatedState = selectCorrectList(unselectedLists, listId);
  const message = {
    username,
    todoLists: updatedState,
  }

  socket.emit(USER_LISTS_UPDATE, message);
}

export const handleDeleteClick = (
  username: string, 
  listId: string | undefined,
) => {
  const message = {
    username, 
    listId
  }
  socket.emit(USER_LIST_DELETE, message);
}
