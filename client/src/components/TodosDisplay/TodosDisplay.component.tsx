import React, { useState } from 'react';
import useFilterTodos from '../../customHooks/useFilterTodos';
import { ITodo, todoElementTemplate } from '../../state/todoLists/todoLists.interfaces';
import TodoItemForm from '../Forms/TodoItemForm/TodoItemForm.component';
import HideCompletedButton from '../HideCompletedButton/HideCompletedButton.component';
import TodoItem from '../TodoItem/TodoItem.component';
import './TodosDisplay.styles.scss';
import TodosInfo from './TodosInfo.component';

interface ITodosDisplayProps {
  minimized: boolean;
}

const TodosDisplay: React.FC<ITodosDisplayProps> = ({
  minimized,
}) => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const selectedList = useFilterTodos(hideCompleted) || undefined;

  return (
    selectedList
      ? (
        <section
          className={`
            displayed-todos
            ${minimized ? 'displayed-todos--minimized' : ''}
          `}
        >
          <header className="displayed-todos__header">

            <h3 className="displayed-todos__title">
              {selectedList.name}
              <span className="displayed-todos__tag"> - List</span>
            </h3>

            <TodosInfo />
            
            <HideCompletedButton 
              hideCompleted={hideCompleted}
              setHideCompleted={setHideCompleted}
            />

          </header>

          <div className="displayed-todos__container">

            {selectedList.todos && selectedList.todos.map((todo: ITodo) => (
              <TodoItem
                todoItem={todo}
                key={todo._id}
                listId={selectedList['_id']}
              />
            ))}

          </div>

          <TodoItemForm
            selectedList={selectedList}
            role = 'task'
          />
        </section>
      )
      : <></>
  );
};

export default TodosDisplay;
