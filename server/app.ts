import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
dotenv.config({path: path.join(__dirname, '..', '.env')});

import { onConnection, socketsSetup } from './sockets/setup';
import { connectToDatabase } from './db';
import { customErrorHandler } from './routes/utilities/errorHandling';
import userRouter from './routes/userRoute/userRouter';

const app = express();
const httpServer = createServer(app);
export const io = new Server(httpServer, socketsSetup);

const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type"]
}

app.set('socketio', io);
app.use(cors(corsOptions));
app.use(express.json());



io.on('connection', onConnection);
io.on('disconnect', (socket) => {
  console.log(`Socket: ${socket.id} has disconnected`);
})

app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.use(customErrorHandler)

connectToDatabase()
  .then(() => {
    httpServer.listen(
      PORT, 
      () => console.log(`Express is listening at http://localhost:${PORT}`)
    );
  })
