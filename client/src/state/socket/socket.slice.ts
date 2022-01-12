import { createSlice } from '@reduxjs/toolkit';
import { getPersistedState } from '../utils/utils';
import { ISocket } from './socket.interfaces';
import { setActiveSocket } from './socket.reducers';

export const emptySocketState: ISocket = {
  state: 'socket',
  host: false,
  connected: false,
  owner: undefined,
  name: undefined,
};

const persistedState = getPersistedState();
const initialState = persistedState && persistedState.socket
  ? persistedState.socket
  : emptySocketState;

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setActiveSocket,
  },
});

export const { actions: socketActions } = socketSlice;
export default socketSlice.reducer;
