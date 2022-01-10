import { useAppSelector } from "../../state/hooks";
import { ITodo } from "../../state/listTodos/listTodos.interfaces";

const ListTodosElements: React.FC<{}> = (

) => {
  const listTodos = useAppSelector(state => state.todos);
  console.log("🚀 ~ file: ListTodos.component.tsx ~ line 7 ~ listTodos", listTodos)
  
  return (
    <section className="list-todos">
      {listTodos.todos.map((todo: ITodo) => <>Ciao</>)}
    </section>
  )
}

export default ListTodosElements;