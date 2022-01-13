import React from 'react';
import './HideCompletedButton.styles.scss';

interface IHideCompletedButtonProps { 
  hideCompleted: boolean,
  setHideCompleted: React.Dispatch<React.SetStateAction<boolean>>
}

const HideCompletedButton: React.FC<IHideCompletedButtonProps>= ({
  hideCompleted,
  setHideCompleted
}) => {
  const HideCompletedTodos = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent> 
  ) => {
    e.preventDefault();
    setHideCompleted(prevState => !prevState);
  };

  return (
    <button className="hide-completed" onClick={HideCompletedTodos}>
      { hideCompleted ? 'Show ' : 'Hide ' }
      Completed Todos
    </button>
  );
};

export default HideCompletedButton;