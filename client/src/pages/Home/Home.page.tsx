import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FETCH_USER_DATA, JOIN_ROOM } from "../../sockets/actions";

import socket from "../../sockets";
import DisplayedTodos from "../../components/DisplayedTodos/DisplayedTodos.component";
import Navigation from "../../components/Navigation/Navigation.component";
import TodoLists from "../../components/SidebarTodoLists/SidebarTodoLists.component";
import './Home.styles.scss'
import { useAppSelector } from "../../state/hooks";

const Home: React.FC = () => {
  const hostUsername = useParams().username;
  const activeUserName = useAppSelector(state => state.user.username)
  const [sidebarMinimized, setSidebarMinimized] = useState<boolean>(false);

  useEffect(() => {
    if(hostUsername) {
      console.log("🚀 ~ file: Home.page.tsx ~ line 19 ~ useEffect ~ hostUsername", hostUsername)
      console.log("🚀 ~ file: Home.page.tsx ~ line 24 ~ useEffect ~ activeUserName", activeUserName)
      socket.emit(JOIN_ROOM, { 
        roomName: hostUsername, 
        user: activeUserName 
      });
      socket.emit(FETCH_USER_DATA, hostUsername);
    }

    return () => { socket.disconnect() };
  }, [hostUsername])
  
  return (
    <article className="home-page">
      <Navigation />
      <TodoLists sidebarMinimized={[sidebarMinimized, setSidebarMinimized]}/>  
      <DisplayedTodos minimized={sidebarMinimized}/> 
    </article>
)}

export default Home;