import React from 'react';
import { useFilterSelectedList, useFindCompletedUncompletedTodos } from '../../customHooks/useFilterTodos';
import { useAppSelector } from '../../state/hooks';
import { ISingleList } from '../../state/todoLists/todoLists.interfaces';



const TodosInfo = () => {
  const [completed, uncompleted] =  useFindCompletedUncompletedTodos();
 
  return (
    <section className="todos-info">
      <p>
        <span>
          Completed {completed.length} - {' '}
        </span>
        <span>
          Left {uncompleted.length}
        </span>
      </p>
    </section>
  );
  return <></>
};

export default TodosInfo;