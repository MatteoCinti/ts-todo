import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { todoListsActions } from "../state/todoLists/todoLists.slice";

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST, USER_LISTS_UPDATE, ADD_TODO_OBJECT, UPDATE_DISPLAYED_TODOS, USER_UPDATE } from './actions';

export const socketConnectToPrivateRoom = ( 
  socket: Socket<DefaultEventsMap, DefaultEventsMap>, 
  username: string,
 ) : void => {
  // socket.join("username");
 }

export const socketConnectionListener = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>, 
  privateRoom: Socket<DefaultEventsMap, DefaultEventsMap>,
  dispatch: any
) : void => {
  socket.on('connect', () => {
    // console.log(`🦧🌊 PENDEJO chingastes con ID: 💨${socket.id}`);
    console.log(`🦧🌊 connected to websockets with ID: 💨${socket.id}`);
  });
  privateRoom.on('connect', () => {
    console.log('Connected to Private Room');
  })
  
  socket.on(JOINED_SHARED_LIST, (message) => {
    console.log(`Joined 🍂 room: ${message.room}, with 🐛 ID: ${socket.id} `)
  })

  socket.on(USER_LISTS_UPDATE, (updatedTodoList) => {
    console.log("🚀 ~ file: listeners.ts ~ line 32 ~ socket.on ~ USER_LISTS_UPDATE", updatedTodoList)
    const payload = updatedTodoList
    dispatch(todoListsActions.updateTodoLists(payload));
  })
  socket.on(USER_UPDATE, (updatedUser) => {
    const payload = updatedUser
    dispatch(todoListsActions.updateTodoLists(payload));
  })
}
