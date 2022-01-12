import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import connectToDatabase from './db/connection';
import socketsSetup from './sockets/setup';
import { customErrorHandler } from './routes/utilities/errorHandling';
import {
  createRoomHandlers, todoListsHandler, todoObjectHandler, userHandlers,
} from './sockets/controllers';
import userRouter from './routes/userRoute/userRouter';

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, socketsSetup);

const { HOST } = process.env;
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Content-Type'],
};

const onConnection = (socket) => {
  console.log('🚀 ~ file: setup.ts ~ line 13 ~ onConnection ~ socket');
  console.log(`Socket: ${socket.id} Connected to socket`);

  createRoomHandlers(socket);
  userHandlers(io, socket, HOST);
  todoListsHandler(io, socket, HOST);
  todoObjectHandler(io, socket, HOST);
};

const onDisconnect = (socket) => {
  console.log(`Socket: ${socket.id} has disconnected`);
};

app.set('socketio', io);
app.use(cors(corsOptions));
app.use(express.json());

io.on('connection', onConnection);
io.on('disconnect', onDisconnect);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.use(customErrorHandler);

connectToDatabase()
  .then(() => {
    httpServer.listen(
      PORT,
      () => console.log(`Express is listening at http://localhost:${PORT}`),
    );
  });
