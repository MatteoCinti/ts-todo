import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { socketActions } from "../state/socket/socket.slice";
import { todoListsActions } from "../state/todoLists/todoLists.slice";

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST, USER_LISTS_UPDATE, ADD_TODO_OBJECT, UPDATE_DISPLAYED_TODOS, USER_UPDATE, JOIN_ROOM } from './actions';

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
  
  socket.on(JOIN_ROOM, (message) => {
    console.log(`Joined 🍂 room: ${message.roomName}`);
    const { roomName, user } = message; 
    
    dispatch(
      socketActions
        .setActiveSocket({
          owner: roomName, 
          name: roomName,
          user
        })
    );
  })

  socket.on(USER_LISTS_UPDATE, (updatedTodoList) => {
    const payload = updatedTodoList;
    dispatch(
      todoListsActions
        .updateTodoLists(payload)
    );
  })
  socket.on(USER_UPDATE, (updatedUser) => {
    const payload = updatedUser
    dispatch(
      todoListsActions
        .updateTodoLists(payload)
    );
  })
}
