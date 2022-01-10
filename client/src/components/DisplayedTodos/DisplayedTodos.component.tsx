import { useAppSelector } from "../../state/hooks";
import { ISingleList, ITodo, todoElementTemplate } from "../../state/todoLists/todoLists.interfaces";
import TodoElementForm from "../TodoElementForm/TodoElementForm.component";
import TodoItem from "../TodoItem/TodoItem.component";
import './DisplayedTodos.styles.scss';



const DisplayedTodos: React.FC<{}> = (

) => {
 
  const displayedList = useAppSelector(state => state.todoLists.todoLists)
  .find((todoList: ISingleList) => todoList.isSelected)
  || [];
  const listId  = displayedList._id;
  
  return (
    displayedList.name 
      ? <section className="displayed-todos">
          <header className="displayed-todos__header">
            <h3 className="displayed-todos__title">
              {displayedList.name}
              <span className="displayed-todos__tag"> - List</span>
            </h3>
          </header>
          
          <div className="displayed-todos__container">
            {displayedList.todos && displayedList.todos.map((todo: ITodo) => 
              <TodoItem 
                todoItem={todo} 
                key={todo['_id']}
                listId={displayedList['_id']}
              />
            )}
          </div>
          <TodoElementForm 
            todoElementTemplate={todoElementTemplate}
            listId={listId}
          />
        </section>
      : <></>
  )
}

export default DisplayedTodos;