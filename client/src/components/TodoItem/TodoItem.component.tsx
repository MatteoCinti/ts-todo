import React, { useState } from 'react';
import { ITodo } from '../../state/todoLists/todoLists.interfaces';
import { ReactComponent as Delete } from '../../images/Delete.svg';
import { ReactComponent as SubtaskToggle } from '../../images/Subtask.svg';
import './TodoItem.styles.scss';
import { handleCompleteClick, handleDeleteClick, handleSubtaskToggle } from './TodoItem.utils';
import { useAppSelector } from '../../state/hooks';
import { useGetOperationsUsername } from '../../customHooks';
import { useFilterSelectedList, useGetSubtasks } from '../../customHooks/useFilterTodos';
import TodoItemForm from '../Forms/TodoItemForm/TodoItemForm.component';
import SubtaskItem from './SubTask.component';

interface ITodoItemProps {
  todoItem: ITodo;
  listId?: string;
}

const TodoItem: React.FC<ITodoItemProps> = ({
  todoItem,
  listId,
}) => {
  const [showForm, setShowForm] = useState(false)
  const todoListsState = useAppSelector((state) => state.todoLists);
  const selectedList = useFilterSelectedList()
  const username = useGetOperationsUsername();
  const { _id, isCompleted, price } = todoItem;
  const subtasks = useGetSubtasks(selectedList, _id);

  return (
    <div className = 'todo-wrapper'>
      <div className={`todo ${isCompleted ? 'complete' : ''}`}>
        <p
          className="todo__name"
          onClick={() => handleCompleteClick(username, todoListsState, _id, listId)}
        >
          <span className="todo__custom-checkbox" />
          {todoItem.name}
        </p>
        
        <p className="todo__price">{price} £</p>

        <div className='todo__icons'>

          <SubtaskToggle 
            className="todo__subtask-toggle"
            onClick={() => handleSubtaskToggle(setShowForm)}
          />
          <Delete
            className="todo__delete"
            onClick={() => handleDeleteClick(username, todoListsState, _id, listId)}
          />
        </div>
      </div>

      {subtasks 
        && subtasks.map(task => 
          <SubtaskItem 
            key={task['_id']}
            username={username}
            subtaskItem={task}
            listId={listId}
            mainTaskCompleted={isCompleted}
          />
        )}
      
      { showForm 
          && <TodoItemForm 
              selectedList={selectedList}
              parentTodoId={_id}
              role = 'subtask'
            />
        }
    </div>
  );
};

export default TodoItem;
