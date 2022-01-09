import React, { useEffect } from 'react';
import { socket, privateRoom } from './sockets';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './pages/Home/Home.page';
import Shared from './pages/Shared/Shared.page';
import WelcomePage from './pages/Welcome/Welcome.page';

import { JOINED_SHARED_LIST, CREATE_SHARED_LIST } from './sockets/actions';
import { useAppDispatch, useAppSelector } from './state/hooks';
import { socketConnectionListener } from './sockets/listeners';


function App() {
  let navigate = useNavigate();
  const userState = useAppSelector(state => state.user)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const  { isLoggedIn, username } = userState
    if ( isLoggedIn ) {
      navigate(`${username}/lists/`);
    } 
    socketConnectionListener(socket, privateRoom, dispatch);
  }, []);

  const handleClick = () => {
    socket.connect();
    socket.emit(CREATE_SHARED_LIST, "privateRoom");
    navigate(`/${socket.id}/lists/1`);
  }

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route 
            path=":username/lists" 
            element={<Home />} 
          />
          <Route 
            path=":username/lists/:list" 
            element={<Home />} 
          />
        </Routes>
    </div>
  );
}

export default App;
 