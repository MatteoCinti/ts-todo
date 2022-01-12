import './ListItem.styles.scss'
import {ReactComponent as Delete} from '../../images/Delete.svg';
import { handleDeleteClick, handleSelectClick } from './ListItem.utils';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { ISingleList } from '../../state/todoLists/todoLists.interfaces';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


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
  const navigate = useNavigate();
  // const [ isSelected, setIsSelected ] = useState(false);
  const { todoLists } = todoListsState;
  const username = useParams().username || userState.username;

  return (
    <div className='list-item'>
      <p 
        className={`list-item__name ${isSelected ? 'selected' : 'unselected'}`}
        onClick={() => handleSelectClick(username, listId, todoListsState, navigate)}
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