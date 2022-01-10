import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation.component";
import TodoLists from "../../components/TodoLists/TodoLists.component";
import socket from "../../sockets";
import { FETCH_USER_DATA } from "../../sockets/actions";
import { useAppSelector } from "../../state/hooks";

const Home: React.FC = () => {
  const { username } = useParams();

  useEffect(() => {
    socket.emit(FETCH_USER_DATA, username);
    console.log("🚀 ~ file: Home.page.tsx ~ line 14 ~ useEffect ~ username", username)
  }, [username])
  
  return (
    <article className="home-page">
      <Navigation />
      <TodoLists />  
    </article>
)}

export default Home;