import axios from "axios";
import { USER_LISTS_UPDATE } from "../../../client/src/sockets/actions";

const createNewList = async ({ username, listName }, HOST, io) => {
  try {
    const response = await axios.post(`${HOST}/api/users/${username}/lists`, { listName });
    const todoLists = response.data;

    io.to(username).emit(USER_LISTS_UPDATE, todoLists);
  } catch (error) {
    console.error(error.message);
  }
};

export default createNewList;