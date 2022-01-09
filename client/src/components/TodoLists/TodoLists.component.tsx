import { ReactChild, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useAppSelector } from "../../state/hooks";
import { ISingleList } from "../../state/todoLists/todoLists.interfaces";
import ListItem from "../ListItem/ListItem.component";
import TodoListsForm from "../TodoListsForm/TodoListsForm.component";
import './TodoLists.styles.scss';

export const emptySingleList: ISingleList = {
  state: 'singleList',
  name: '',
  todos: []
}

const TodoLists: React.FC = ({

}) => {
  const listsState = useAppSelector(state => state.todoLists.todoLists);
 
  return (
    <section className='todo-lists'>
      <h6 className='todo-lists__title'>Your Lists</h6>
      {
        listsState && listsState.map((list: ISingleList) => (
          <ListItem
            key={list._id} 
            listName={list.name} 
            listId={list._id}
          />
        ))
      }
      <TodoListsForm 
        listsState={emptySingleList}
      />
    </section>
  )
}

export default TodoLists;