import { io } from "../app";
import { createRoomHandlers, todoListsHandler, todoObjectHandler, userHandlers } from "./controllers";

const HOST = process.env.HOST;

export const socketsSetup = { 
  cors: { 
    origin: 'http://localhost:3000' 
  } 
}

export const onConnection = (socket) => {  
  console.log("🚀 ~ file: setup.ts ~ line 13 ~ onConnection ~ socket");
  console.log(`Socket: ${socket.id} Connected to socket`);
  
  createRoomHandlers(io, socket);
  userHandlers(io, socket, HOST);
  todoListsHandler(io, socket, HOST);
  todoObjectHandler(io, socket, HOST);
}
