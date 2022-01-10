import { useAppSelector } from "../../state/hooks";
import { ISingleList, ITodo, todoElementTemplate } from "../../state/todoLists/todoLists.interfaces";
import TodoElementForm from "../TodoElementForm/TodoElementForm.component";
import './DisplayedTodos.styles.scss';



const DisplayedTodos: React.FC<{}> = (

) => {
 
  const displayedList = useAppSelector(state => state.todoLists.todoLists)
                          .find((todoList: ISingleList) => todoList.isSelected)
                          || [];
  const listId  = displayedList._id;
  // console.log("🚀 ~ file: DisplayedTodos.component.tsx ~ line 16 ~ listId", displayedList)
  
  return (
    <section className="displayed-todos">
      {displayedList.todos && displayedList.todos.map((todo: ITodo) => 
        <>{todo.name}</>
      )}
      <TodoElementForm 
        todoElementTemplate={todoElementTemplate}
        listId={listId}
      />
    </section>
  )
}

export default DisplayedTodos;