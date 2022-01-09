import './ListItem.styles.scss'
import {ReactComponent as Delete} from '../../images/Delete.svg';
import handleClick from './ListItem.utils';
import { useAppSelector } from '../../state/hooks';


interface IListItemProps {
  listName: string;
  listId: string;
}

const ListItem: React.FC<IListItemProps> = ({
  listName, 
  listId
}) => {
  const userState = useAppSelector(state => state.user);
  const { username } = userState;
  return (
    <div className='list-item'>
      <p className='list-item__name'>
        {listName}
      </p>
      <Delete 
        className='list-item__delete'
        onClick={() => handleClick(username, listId)} 
      />
    </div>
  )
}

export default ListItem;