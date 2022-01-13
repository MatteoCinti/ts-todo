import { JOIN_ROOM } from "../../../client/src/sockets/actions";

const joinRoom = ({ roomName, user }, socket) => {
  socket.join(roomName);
  socket.emit(JOIN_ROOM, { roomName, user });
};

export default joinRoom;