import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Imagotype } from '../../images/Imagotype.svg';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import { userActions } from '../../state/user/user.slice';

import './Navigation.styles.scss';

const Navigation: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const { username } = userState || 'Guest';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    dispatch(userActions.logOut());
  };

  return (
    <nav className="navigation">
      <Imagotype className="navigation__imagotype" />
      <h3 className="navigation__title">
        {'Just Do It '}
        <span className="navigation__username">
          {username}
        </span>
      </h3>
      <p
        className="navigation__logout"
        onClick={handleClick}
      >
        Log out
      </p>
    </nav>
  );
};

export default Navigation;
