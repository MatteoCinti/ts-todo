import React, { useEffect } from 'react';
import { socket, privateRoom } from './sockets';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home/Home.page';
import Shared from './pages/Shared/Shared.page';

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST } from './sockets/actions';
import logo from './logo.svg';
import './App.css';


function App() {
  let navigate = useNavigate();

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`🦧🌊 PENDEJO chingastes con ID: 💨${socket.id}`);
    });
    privateRoom.on('connect', () => {
      console.log('CARNAL CONECTADO');
    })

    socket.on(JOINED_SHARED_LIST, (message) => {
      console.log(`Pinche Cochiloco joined 🍂 room: ${message.room}, with 🐛 ID: ${socket.id} `)
    })
  }, []);

  const handleClick = () => {
    socket.connect();
    socket.emit(CREATE_SHARED_LIST, "privateRoom");
    navigate(`/${socket.id}/lists/1`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":userId/lists/:list" element={<Shared />} />
        </Routes>
        <button
          type="button"
          onClick={handleClick}
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
