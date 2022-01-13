import axios from 'axios';
import { Server, Socket } from 'socket.io';
import {
  ADD_TODO_OBJECT, CREATE_NEW_LIST, FETCH_USER_DATA, JOIN_ROOM, USER_LISTS_UPDATE, USER_LIST_DELETE,
} from '../../../client/src/sockets/actions';
import addTodoObject from './addTodoObject';
import createNewList from './createNewList';
import fetchUserData from './fetchUserData';
import joinRoom from './joinRoom';
import userListDelete from './userListsDelete';
import userListsUpdate from './userListsUpdate';

export const createRoomHandlers = (socket: Socket) => {
  socket.on(JOIN_ROOM, (message) => joinRoom(message, socket));
};

export const userHandlers = (io: Server, socket: Socket, HOST: string) => {
  socket.on(FETCH_USER_DATA, async (username) => fetchUserData(username, HOST, io));
};

export const todoListsHandler = (io: Server, socket: Socket, HOST: string) => {
  socket.on(CREATE_NEW_LIST, async (message) => createNewList(message, HOST, io));
  socket.on(USER_LISTS_UPDATE, async (message) => userListsUpdate(message, HOST, io));
  socket.on(USER_LIST_DELETE, async (message) => userListDelete(message, HOST, io));
};

export const todoObjectHandler = (io: Server, socket: Socket, HOST: string) => {
  socket.on(ADD_TODO_OBJECT, async (message) => addTodoObject(message, HOST, io));
};
