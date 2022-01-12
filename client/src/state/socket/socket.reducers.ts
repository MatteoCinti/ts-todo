import { PayloadAction } from '@reduxjs/toolkit';
import { ISocket } from './socket.interfaces';

export const setActiveSocket = (
  state: ISocket,
  action: PayloadAction<{ owner: string, name: string, user: string }>,
): ISocket => {
  const { owner, name, user } = action.payload;
  const host = user === name;

  return {
    ...state,
    connected: true,
    owner,
    name,
    host,
  };
};
