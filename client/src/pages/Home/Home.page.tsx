import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FETCH_USER_DATA } from "../../sockets/actions";

import socket from "../../sockets";
import DisplayedTodos from "../../components/DisplayedTodos/DisplayedTodos.component";
import Navigation from "../../components/Navigation/Navigation.component";
import TodoLists from "../../components/SidebarTodoLists/SidebarTodoLists.component";
import './Home.styles.scss'
import { useAppSelector } from "../../state/hooks";

const Home: React.FC = () => {
  const { username } = useParams();

  useEffect(() => {
    // console.log("🚀 ~ file: Home.page.tsx ~ line 14 ~ useEffect ~ username", username)
    socket.emit(FETCH_USER_DATA, username);
  }, [username])
  
  return (
    <article className="home-page">
      <Navigation />
      <TodoLists />  
      <DisplayedTodos /> 
    </article>
)}

export default Home;