import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
dotenv.config({path: path.join(__dirname, '..', '.env')});

import { CREATE_SHARED_LIST, JOINED_SHARED_LIST, CREATE_NEW_LIST, USER_LISTS_UPDATE, USER_LIST_DELETE, FETCH_USER_DATA, ADD_TODO_OBJECT } from '../client/src/sockets/actions';
import { socketsSetup } from './sockets/setup';
import { connectToDatabase } from './db';
import socketsRouter from './routes/socketsRouter';
import userRouter from './routes/userRoute/userRouter';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, socketsSetup);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type"]
}

app.set('socketio', io);
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
    console.log(`Joined 🍂 room: ${room}, with 🐛 ID: ${socket.id} `)
    io.to(room).emit(JOINED_SHARED_LIST, JSON.stringify(data));
  })

  socket.on(CREATE_NEW_LIST, async (message) => {
    try {
      const { username, listName } = message;
      const response = await axios.post(`${HOST}/api/users/${username}/lists`, { listName });
      const todoLists = response.data;

      socket.join(username);
      
      io.to(username).emit(USER_LISTS_UPDATE, todoLists)
    } catch (error) {
      console.error(error.message)
    }
  })

  socket.on(USER_LIST_DELETE, async (message) => {
    try {
      const { username, listId } = message;
      const response = await axios.delete(`${HOST}/api/users/${username}/lists/${listId}`);
      const todoLists = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, todoLists)
    } catch (error) {
      console.error(error.message)      
    }
  })

  socket.on(FETCH_USER_DATA, async (username) => {
    try {
      const response = await axios.get(`${HOST}/api/users/${username}`);
      const { todoLists } = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, todoLists)
    } catch (error) {
      console.error(error.message);
    }
  })

  socket.on(USER_LISTS_UPDATE, async (message) => {
    try {
      const { username, todoLists } = message;
      console.log("🚀 ~ file: app.ts ~ line 87 ~ socket.on ~ username", username)
      
      const response = await axios.put(`${HOST}/api/users/${username}/lists`, { todoLists });
      const updatedTodoLists = response.data.todoLists;
      console.log("🚀 ~ file: app.ts ~ line 90 ~ socket.on ~ response", response)
      console.log("🚀 ~ file: app.ts ~ line 90 ~ socket.on ~ response.data", response.data)
      io.to(username).emit(USER_LISTS_UPDATE, updatedTodoLists);
    } catch (error) {
      console.error(error)
    }
  })

  socket.on(ADD_TODO_OBJECT, async (message) => {
    try {
      const { username, listId, todoObject } = message;
      const response = await axios.post(`${HOST}/api/users/${username}/lists/${listId}`, { todoObject });
      
      const updatedTodos = response.data;

      io.to(username).emit(USER_LISTS_UPDATE, updatedTodos);
    } catch (error) {
      console.error(error)
    }
  })

});


app.use('/sockets', socketsRouter);
app.use('/api/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client', 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.use(function (err, req, res, next) {
  console.error(err);
  res.status(err.code || 500).json(err.message);
})

connectToDatabase()
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Express is listening at http://localhost:${PORT}`));
  })
