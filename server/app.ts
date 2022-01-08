import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config({path: path.join(__dirname, '..', '.env')});
import { CREATE_SHARED_LIST, JOINED_SHARED_LIST } from '../client/src/sockets/actions';
import { socketsSetup } from './sockets/setup';
import { connectToDatabase } from './db';
import socketsRouter from './routes/socketsRouter';
import userRouter from './routes/userRoute/userRouter';

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, socketsSetup);
app.set('socketio', io);
// app.use((req, res, next) => {
//   req.io = io;
//   return next();
// });

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type"]
}
app.use(cors(corsOptions));
app.use(express.json());

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
app.use('/api/users', userRouter);

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.code || 500).json(err.message);
})

connectToDatabase()
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));
  })
