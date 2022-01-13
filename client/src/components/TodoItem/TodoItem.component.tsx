import React from 'react';
import { ITodo } from '../../state/todoLists/todoLists.interfaces';
import { ReactComponent as Delete } from '../../images/Delete.svg';
import './TodoItem.styles.scss';
import { handleCompleteClick, handleDeleteClick } from './TodoItem.utils';
import { useAppSelector } from '../../state/hooks';
import { useGetOperationsUsername } from '../../customHooks';

interface ITodoItemProps {
  todoItem: ITodo;
  listId?: string;
}

const TodoItem: React.FC<ITodoItemProps> = ({
  todoItem,
  listId,
}) => {
  const todoListsState = useAppSelector((state) => state.todoLists);
  const username = useGetOperationsUsername();
  const { _id, isCompleted, price } = todoItem;

  return (
    <div className={`
        todo 
        ${isCompleted ? 'complete' : ''}
      `}
    >
      <p
        className="todo__name"
        onClick={() => handleCompleteClick(username, todoListsState, _id, listId)}
      >
        <span className="todo__custom-checkbox" />
        {todoItem.name}
      </p>
      
      <p className="todo__price">
        {price} £
      </p>

      <div className='todo__icons'>
        <Delete
          className="list-item__delete"
          onClick={() => handleDeleteClick(username, todoListsState, _id, listId)}
        />
      </div>
    </div>
  );
};

export default TodoItem;
