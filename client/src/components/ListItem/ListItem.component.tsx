import './ListItem.styles.scss'
import {ReactComponent as Delete} from '../../images/Delete.svg';
import { handleDeleteClick, handleSelectClick } from './ListItem.utils';
import { useAppSelector } from '../../state/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOperationsUsername } from '../../customHooks';

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
  const todoListsState = useAppSelector(state => state.todoLists);
  const navigate = useNavigate();
  const username = useGetOperationsUsername();

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