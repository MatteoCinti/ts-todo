import React, { useEffect } from 'react';
import { socket, privateRoom } from './sockets';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home/Home.page';
import Shared from './pages/Shared/Shared.page';
import WelcomePage from './pages/Welcome/Welcome.page';

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST } from './sockets/actions';
import { useAppSelector } from './state/hooks';
import { socketConnectionListener } from './sockets/listeners';


function App() {
  let navigate = useNavigate();
  const userState = useAppSelector(state => state.user)

  useEffect(() => {
    socketConnectionListener(socket, privateRoom);
  }, []);

  const handleClick = () => {
    socket.connect();
    socket.emit(CREATE_SHARED_LIST, "privateRoom");
    navigate(`/${socket.id}/lists/1`);
  }

  return (
    <div className="App">
        <Routes>
          {console.log(process.env.REACT_APP_NOT_SECRET_CODE)}
          <Route path="/" element={
            !userState.isLoggedIn 
              ? <WelcomePage />
              : <Home />
          } />
          <Route 
            path=":userId/lists/:list" 
            element={<Shared />} 
          />
        </Routes>
    </div>
  );
}

export default App;
