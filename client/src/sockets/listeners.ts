import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST } from './actions';

export const socketConnectionListener = (socket: Socket<DefaultEventsMap, DefaultEventsMap>, privateRoom: Socket<DefaultEventsMap, DefaultEventsMap>) : void => {
  socket.on('connect', () => {
    console.log(`🦧🌊 PENDEJO chingastes con ID: 💨${socket.id}`);
  });
  privateRoom.on('connect', () => {
    console.log('CARNAL CONECTADO');
  })
  
  socket.on(JOINED_SHARED_LIST, (message) => {
    console.log(`Pinche Cochiloco joined 🍂 room: ${message.room}, with 🐛 ID: ${socket.id} `)
  })
}
