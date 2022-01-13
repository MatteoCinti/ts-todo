import axios from "axios";
import { USER_LISTS_UPDATE } from "../../../client/src/sockets/actions";

const userListDelete = async (message, HOST, io) => {
  try {
    const { username, listId } = message;
    const response = await axios.delete(`${HOST}/api/users/${username}/lists/${listId}`);
    const todoLists = response.data;

    io.to(username).emit(USER_LISTS_UPDATE, todoLists);
  } catch (error) {
    console.error(error.message);
  }
}

export default userListDelete;