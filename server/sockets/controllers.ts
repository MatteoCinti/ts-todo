import axios from 'axios';
import { Server, Socket } from 'socket.io';
import {
  ADD_TODO_OBJECT, CREATE_NEW_LIST, FETCH_USER_DATA, JOIN_ROOM, USER_LISTS_UPDATE, USER_LIST_DELETE,
} from '../../client/src/sockets/actions';

export const createRoomHandlers = (socket: Socket) => {
  socket.on(JOIN_ROOM, ({ roomName, user }) => {
    socket.join(roomName);
    socket.emit(JOIN_ROOM, { roomName, user });
  });
};

export const userHandlers = (io: Server, socket: Socket, HOST: string) => {
  socket.on(FETCH_USER_DATA, async (username) => {
    try {
      const response = await axios.get(`${HOST}/api/users/${username}`);
      const { todoLists } = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, todoLists);
    } catch (error) {
      console.error(error.message);
    }
  });
};

export const todoListsHandler = (io: Server, socket: Socket, HOST: string) => {
  socket.on(CREATE_NEW_LIST, async ({ username, listName }) => {
    try {
      const response = await axios.post(`${HOST}/api/users/${username}/lists`, { listName });
      const todoLists = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, todoLists);
    } catch (error) {
      console.error(error.message);
    }
  });

  socket.on(USER_LISTS_UPDATE, async (message) => {
    try {
      const { username, todoLists } = message;
      const response = await axios.put(`${HOST}/api/users/${username}/lists`, { todoLists });
      const updatedTodoLists = response.data.todoLists;

      io.to(username).emit(USER_LISTS_UPDATE, updatedTodoLists);
    } catch (error) {
      console.error(error);
    }
  });

  socket.on(USER_LIST_DELETE, async (message) => {
    try {
      const { username, listId } = message;
      const response = await axios.delete(`${HOST}/api/users/${username}/lists/${listId}`);
      const todoLists = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, todoLists);
    } catch (error) {
      console.error(error.message);
    }
  });
};

export const todoObjectHandler = (io: Server, socket: Socket, HOST: string) => {
  socket.on(ADD_TODO_OBJECT, async (message) => {
    try {
      const { username, listId, todoObject } = message;
      const response = await axios.post(`${HOST}/api/users/${username}/lists/${listId}`, { todoObject });

      const updatedTodos = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, updatedTodos);
    } catch (error) {
      console.error(error);
    }
  });
};
