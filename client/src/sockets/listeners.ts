import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { todoListsActions } from "../state/todoLists/todoLists.slice";

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST, USER_LISTS_UPDATE, ADD_TODO_OBJECT, UPDATE_DISPLAYED_TODOS } from './actions';

export const socketConnectionListener = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap>, 
  privateRoom: Socket<DefaultEventsMap, DefaultEventsMap>,
  dispatch: any
) : void => {
  socket.on('connect', () => {
    console.log(`🦧🌊 PENDEJO chingastes con ID: 💨${socket.id}`);
  });
  privateRoom.on('connect', () => {
    console.log('CARNAL CONECTADO');
  })
  
  socket.on(JOINED_SHARED_LIST, (message) => {
    console.log(`Pinche Cochiloco joined 🍂 room: ${message.room}, with 🐛 ID: ${socket.id} `)
  })

  socket.on(USER_LISTS_UPDATE, (updatedTodoList) => {
    const payload = updatedTodoList
    dispatch(todoListsActions.updateTodoLists(payload));
  })
}
