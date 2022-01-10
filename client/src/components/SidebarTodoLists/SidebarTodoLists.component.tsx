import { useAppSelector } from "../../state/hooks";
import { emptySingleList, ISingleList } from "../../state/todoLists/todoLists.interfaces";
import ListItem from "../ListItem/ListItem.component";
import TodoListsForm from "../TodoListsForm/TodoListsForm.component";
import './SidebarTodoLists.styles.scss';

const TodoLists: React.FC = ({

}) => {
  const listsState = useAppSelector(state => state.todoLists.todoLists) || [];
 
  return (
    <section className='todo-lists'>
      <h6 className='todo-lists__title'>Your Lists</h6>
      {
        listsState && listsState.map((list: ISingleList) => (
          <ListItem
            key={list._id} 
            listName={list.name} 
            listId={list._id}
            isSelected={list.isSelected}
          />
        ))
      }
      <TodoListsForm 
        listsState={emptySingleList}
      />
    </section>
  )
}

export default TodoLists;