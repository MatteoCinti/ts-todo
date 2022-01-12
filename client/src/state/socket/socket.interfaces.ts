export interface ISocket {
  state: 'socket',
  host: boolean,
  connected: boolean,
  owner?: string,
  name?: string,
}