import React, { useEffect } from 'react';
import { socket, privateRoom } from './sockets';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';

import Home from './pages/Home/Home.page';
import WelcomePage from './pages/Welcome/Welcome.page';

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST } from './sockets/actions';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { socketConnectionListener, socketConnectToPrivateRoom } from './sockets/listeners';


function App() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    socketConnectionListener(socket, privateRoom, dispatch);
  }, []);

  return (
    <div className="App">
        <Routes>
          <Route path="/app" element={<WelcomePage />} />
          <Route 
            path="/app/:username/lists" 
            element={<Home />} 
          />
          <Route 
            path="/app/:username/lists/:list" 
            element={<Home />} 
          />
        </Routes>
    </div>
  );
}

export default App;
 