import React from 'react';
import './ListItem.styles.scss';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Delete } from '../../images/Delete.svg';
import { getAccumulatedListBudget, handleDeleteClick, handleSelectClick } from './ListItem.utils';
import { useAppSelector } from '../../state/hooks';
import { useGetOperationsUsername } from '../../customHooks';
interface IListItemProps {
  listName: string;
  listId: string | undefined;
  isSelected: boolean;
}

const ListItem: React.FC<IListItemProps> = ({
  listName,
  listId,
  isSelected,
}) => {
  const todoListsState = useAppSelector((state) => state.todoLists);
  const totalBudget = getAccumulatedListBudget(listId)
  const navigate = useNavigate();
  const username = useGetOperationsUsername();

  return (
    <div className="list-item">
      <p
        className={`list-item__name ${isSelected ? 'selected' : 'unselected'}`}
        onClick={() => handleSelectClick(username, listId, todoListsState, navigate)}
      >
        {listName}
      </p>

      <p className="list-item__budget">
       {totalBudget} £
      </p>

      <div className="list-item__icons-container">


        <Delete
          className="list-item__delete"
          onClick={() => handleDeleteClick(username, listId)}
        />
      </div>
    </div>
  );
};

export default ListItem;
