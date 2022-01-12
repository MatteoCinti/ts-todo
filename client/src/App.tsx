import React, { useEffect } from 'react';
import {
  Routes, Route,
} from 'react-router-dom';
import { socket } from './sockets';

import Home from './pages/Home/Home.page';
import WelcomePage from './pages/Welcome/Welcome.page';

import { useAppDispatch } from './state/hooks';
import socketConnectionListener from './sockets/listeners';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketConnectionListener(socket, dispatch);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/:username/lists"
          element={<Home />}
        />
        <Route
          path="/:username/lists/:list"
          element={<Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
