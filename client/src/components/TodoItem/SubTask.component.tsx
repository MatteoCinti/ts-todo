import { ReactComponent as Delete } from '../../images/Delete.svg';
import { useAppSelector } from '../../state/hooks';
import { ITodo } from '../../state/todoLists/todoLists.interfaces';
import { handleCompleteClick, handleDeleteClick } from './TodoItem.utils';

interface ISubtaskItemProps { 
  username: string;
  subtaskItem: ITodo;
  listId?: string;
  mainTaskCompleted: boolean
}

const SubtaskItem: React.FC<ISubtaskItemProps> = ({
  username,
  subtaskItem,
  listId,
  mainTaskCompleted
}) => {
  const { _id, isCompleted, price } = subtaskItem;
  const todoListsState = useAppSelector((state) => state.todoLists);

  return (
    <div className={`todo ${isCompleted || mainTaskCompleted ? 'complete' : ''} subtask`}>
      <p
        className="todo__name subtask__name"
        onClick={() => handleCompleteClick(username, todoListsState, _id, listId)}
      >
        <span className="todo__custom-checkbox" />
        {subtaskItem.name}
      </p>
      
      <p className="todo__price">{price} £</p>

      <div className='todo__icons'>
        <Delete
          className="todo__delete"
          onClick={() => handleDeleteClick(username, todoListsState, _id, listId)}
        />
      </div>
    </div>
  )
}

export default SubtaskItem;