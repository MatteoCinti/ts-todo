import axios from "axios";
import { USER_LISTS_UPDATE } from "../../../client/src/sockets/actions";

const addTodoObject = async (message, HOST, io) => {
  try {
    const { username, listId, todoObject } = message;
    const response = await axios.post(`${HOST}/api/users/${username}/lists/${listId}`, { todoObject });

    const updatedTodos = response.data;

    io.to(username).emit(USER_LISTS_UPDATE, updatedTodos);
  } catch (error) {
    console.error(error);
  }
};

export default addTodoObject;
