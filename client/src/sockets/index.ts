import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_HOST || 'http://localhost:5000';
export const socket = io(URL);
export const privateRoom = io(`${URL}/privateRoom`, { autoConnect: false });
