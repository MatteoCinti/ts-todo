import './ListItem.styles.scss'
import {ReactComponent as Delete} from '../../images/Delete.svg';
import { handleDeleteClick, handleSelectClick } from './ListItem.utils';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ISingleList } from '../../state/todoLists/todoLists.interfaces';


interface IListItemProps {
  listName: string;
  listId: string | undefined;
  isSelected: boolean;
}

const ListItem: React.FC<IListItemProps> = ({
  listName, 
  listId,
  isSelected
}) => {
  const userState = useAppSelector(state => state.user);
  const todoListsState = useAppSelector(state => state.todoLists);
  const { todoLists } = todoListsState;
  const selectedListState = todoLists.filter((list: ISingleList) => list.isSelected)[0];
  console.log("🚀 ~ file: ListItem.component.tsx ~ line 20 ~ todoListsState", selectedListState.todos)
  const { username } = userState;

  return (
    <div className='list-item'>
      <p 
        className={`list-item__name ${isSelected && 'selected'}`}
        onClick={() => handleSelectClick(todoListsState, listId, username)}
      >
        {listName}
      </p>
      <Delete 
        className='list-item__delete'
        onClick={() => handleDeleteClick(username, listId)} 
      />
    </div>
  )
}

export default ListItem;