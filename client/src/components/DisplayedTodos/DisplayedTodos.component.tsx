import React from 'react';
import { useAppSelector } from '../../state/hooks';
import { ISingleList, ITodo, todoElementTemplate } from '../../state/todoLists/todoLists.interfaces';
import TodoElementForm from '../TodoElementForm/TodoElementForm.component';
import TodoItem from '../TodoItem/TodoItem.component';
import './DisplayedTodos.styles.scss';

interface IDisplayedTodosProps {
  minimized: boolean;
}

const DisplayedTodos: React.FC<IDisplayedTodosProps> = ({
  minimized,
}) => {
  const list = useAppSelector((state) => state.todoLists.todoLists) || [];
  const displayedList = list.find((todoList: ISingleList) => todoList.isSelected);

  return (
    displayedList
      ? (
        <section
          className={`
            displayed-todos
            ${minimized ? 'displayed-todos--minimized' : ''}
          `}
        >
          <header className="displayed-todos__header">
            <h3 className="displayed-todos__title">
              {displayedList.name}
              <span className="displayed-todos__tag"> - List</span>
            </h3>
          </header>

          <div className="displayed-todos__container">
            {displayedList.todos && displayedList.todos.map((todo: ITodo) => (
              <TodoItem
                todoItem={todo}
                key={todo._id}
                listId={displayedList._id}
              />
            ))}
          </div>
          <TodoElementForm
            todoElementTemplate={todoElementTemplate}
            listId={displayedList._id}
          />
        </section>
      )
      : <></>
  );
};

export default DisplayedTodos;
