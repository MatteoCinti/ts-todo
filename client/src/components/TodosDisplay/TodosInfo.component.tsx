import React from 'react';
import { useFindCompletedUncompletedTodos } from '../../customHooks/useFilterTodos';

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
};

export default TodosInfo;