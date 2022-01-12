import { ITodo } from "../../state/todoLists/todoLists.interfaces"
import {ReactComponent as Delete} from '../../images/Delete.svg';
import  './TodoItem.styles.scss';
import { handleCompleteClick, handleDeleteClick } from "./TodoItem.utils";
import { useAppSelector } from "../../state/hooks";
import { useParams } from "react-router-dom";

interface ITodoItemProps {
  todoItem: ITodo;
  listId: string;
} 

const TodoItem: React.FC<ITodoItemProps> = ({
  todoItem, 
  listId
}) => {
  const userState = useAppSelector(state => state.user);
  const todoListsState = useAppSelector(state => state.todoLists);
  const username  = useParams().username || userState.username;
  const id = todoItem['_id'];
  const { isCompleted } = todoItem;

  return (
    <div className={`
      todo 
      ${ isCompleted 
          ? 'complete' 
          : ''
      }`}>
      <p 
        className='todo__name'
        onClick={() => handleCompleteClick(username, todoListsState, id, listId)}
      >
        <span className='todo__custom-checkbox'></span>
        {todoItem.name}
      </p>
      <Delete 
        className='list-item__delete'
        onClick={() => handleDeleteClick(username, todoListsState, id, listId)}
      />
    </div>
  )
}

export default TodoItem;