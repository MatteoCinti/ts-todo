import axios from "axios";
import { USER_LISTS_UPDATE } from "../../../client/src/sockets/actions";

const fetchUserData = async (username, HOST, io) => {
  try {
    const response = await axios.get(`${HOST}/api/users/${username}`);
    const { todoLists } = response.data;

    io.to(username).emit(USER_LISTS_UPDATE, todoLists);
  } catch (error) {
    console.error(error.message);
  }
}

export default fetchUserData;