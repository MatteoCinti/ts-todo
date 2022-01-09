import Navigation from "../../components/Navigation/Navigation.component";
import TodoLists from "../../components/TodoLists/TodoLists.component";

const Home: React.FC = () => (
  <article className="home-page">
    <Navigation />
    <TodoLists />  
  </article>
)

export default Home;