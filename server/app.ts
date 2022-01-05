import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';

import socketsRouter from './routes/socketsRouter';
import { socketsSetup } from './sockets/setup';
import { CREATE_SHARED_LIST, JOINED_SHARED_LIST } from '../client/src/sockets/actions';

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, socketsSetup);
app.set('socketio', io);
// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });
app.use(cors());

io.on('connection', (socket) => {
  console.log(`🌺 Socket: ${socket.id} Connected to socket`);


  socket.on(CREATE_SHARED_LIST, (room) => {
    const data = {
      room: room,
      message: 'User accessed room'
    }
    socket.join(room);
    console.log(`Pinche Cochiloco joined 🍂 room: ${room}, with 🐛 ID: ${socket.id} `)
    io.to(room).emit(JOINED_SHARED_LIST, JSON.stringify(data));
  })

});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/sockets', socketsRouter);

httpServer.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));
