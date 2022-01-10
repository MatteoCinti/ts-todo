import { useAppSelector } from "../../state/hooks";
import { ISingleList } from "../../state/todoLists/todoLists.interfaces";
import { ITodo } from "../../state/todoObjects/todoObjects.interfaces";
import { todoElementTemplate } from "../../state/todoObjects/todoObjects.slice";
import TodoElementForm from "../TodoElementForm/TodoElementForm.component";
import './DisplayedTodos.styles.scss';

const DisplayedTodos: React.FC<{}> = (

) => {
  const displayedTodosState = useAppSelector(state => state.todos);
  console.log("🚀 ~ file: DisplayedTodos.component.tsx ~ line 11 ~ displayedTodosState", displayedTodosState)
  const displayedList = useAppSelector(state => state.todoLists.todoLists)
                          .find((todoList: ISingleList) => todoList.isSelected);
  const { listId } = displayedList;
  
  return (
    <section className="displayed-todos">
      {displayedTodosState.todos.map((todo: ITodo) => <>Ciao</>)}
      <TodoElementForm 
        todoElementTemplate={todoElementTemplate}
        listId={listId}
      />
    </section>
  )
}

export default DisplayedTodos;