import axios from "axios";
import { USER_LISTS_UPDATE } from "../../../client/src/sockets/actions";

const userListsUpdate = async (message, HOST, io) => {
  try {
    const { username, todoLists } = message;
    const response = await axios.put(`${HOST}/api/users/${username}/lists`, { todoLists });
    const updatedTodoLists = response.data.todoLists;

    io.to(username).emit(USER_LISTS_UPDATE, updatedTodoLists);
  } catch (error) {
    console.error(error);
  }
}

export default userListsUpdate;