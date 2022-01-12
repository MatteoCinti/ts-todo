import { NavigateFunction } from "react-router-dom";
import socket from "../../sockets";
import { USER_LISTS_UPDATE, USER_LIST_DELETE } from "../../sockets/actions";
import { ISingleList, ITodoLists } from "../../state/todoLists/todoLists.interfaces";
import { selectCorrectList, unselectAllLists } from "../../state/todoLists/todoLists.utils";
export const handleSelectClick = (
  username: string,
  listId: string | undefined,
  state: ITodoLists,
  navigate: NavigateFunction
  // setIsSelected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { todoLists } = state;
  const selectedList = todoLists.find((list: ISingleList) => list._id === listId)
  if (!selectedList) { return false }
  
  const unselectedLists = unselectAllLists(state);
  const updatedState = selectCorrectList(unselectedLists, listId);
  const message = {
    username,
    todoLists: updatedState,
  }
  console.log("🚀 ~ file: ListItem.utils.ts ~ line 23 ~ username", username)
  console.log("🚀 ~ file: ListItem.utils.ts ~ line 25 ~ `/${username}/lists/${selectedList.name}`", `/${username}/lists/${selectedList.name}`)
  navigate(`/${username}/lists/${selectedList.name}`)
  socket.emit(USER_LISTS_UPDATE, message);
}

export const handleDeleteClick = (
  username: string, 
  listId: string | undefined
) => {
  const message = {
    username, 
    listId
  }
  socket.emit(USER_LIST_DELETE, message);
}
