import { io } from "socket.io-client";

const URL = "http://localhost:5000";
export const socket = io(URL, { autoConnect: false });
export const privateRoom = io(`${URL}/privateRoom`, { autoConnect: false })

export default socket;