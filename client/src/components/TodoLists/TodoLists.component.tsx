import { useAppSelector } from "../../state/hooks";
import { ISingleList } from "../../state/todoLists/todoLists.interfaces";
import TodoListsForm from "../TodoListsForm/TodoListsForm.component";
import './TodoLists.styles.scss';

export const emptySingleList: ISingleList = {
  state: 'singleList',
  name: '',
  todos: []
}

const TodoLists: React.FC = ({

}) => {
  const listsState = useAppSelector(state => state.todoLists);
  
  return (
    <section className='todo-lists'>
      <h6 className='todo-lists__title'>Your Lists</h6>

      <TodoListsForm 
        listsState={emptySingleList}
      />
    </section>
  )
}

export default TodoLists;