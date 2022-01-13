import React from 'react';
import { useAppSelector } from '../../state/hooks';
import { emptySingleList, ISingleList } from '../../state/todoLists/todoLists.interfaces';
import { ReactComponent as Minimize } from '../../images/Minimize.svg';
import ListItem from '../ListItem/ListItem.component';
import TodoListsForm from '../Forms/TodoListsForm/TodoListsForm.component';
import './SidebarTodoLists.styles.scss';
import handleMinimizeClick from './SidebarTodoLists.utils';

interface ITodoListsProps {
  sidebarMinimized: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const TodoLists: React.FC<ITodoListsProps> = ({
  sidebarMinimized,
}) => {
  const [minimized, setMinimized] = sidebarMinimized;
  const listsState = useAppSelector((state) => state.todoLists.todoLists) || [];

  return (
    <section
      className={`todo-lists
          ${minimized ? 'todo-lists--minimized' : ''}
          `}
    >
      <h6 className="todo-lists__title">Your Lists</h6>
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

      <div className="todo-lists__icons-container icons-container">
        <div className="icon-container">
          <Minimize
            className="todo-lists__minimize"
            onClick={() => handleMinimizeClick(setMinimized)}
          />
          <label className="icon-container__label">Minimize</label>
        </div>
      </div>
    </section>
  );
};

export default TodoLists;
