import socket from "../../sockets";
import { USER_LIST_DELETE } from "../../sockets/actions";

const handleClick = (
  username: string, 
  listId: string,
) => {
  const message = {
    username, 
    listId
  }
  socket.emit(USER_LIST_DELETE, message);
}

export default handleClick;