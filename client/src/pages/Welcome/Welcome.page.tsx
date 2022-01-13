import React, { useState } from 'react';

import './Welcome.styles.scss';
import { ReactComponent as Imagotype } from '../../images/Imagotype.svg';
import { useAppSelector } from '../../state/hooks';
import LogOrRegister from '../../components/LogOrRegister/LogOrRegister.component';
import { RegisterLogin } from '../../state/user/user.interfaces';
import LoginRegisterForm from '../../components/Forms/LogInRegisterForm/LoginRegisterFom.component';

const WelcomePage: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const [logOrRegister, setLogOrRegister] = useState<RegisterLogin>(RegisterLogin.login);

  return (
    <article className="welcome-page">

      <section className="logo">
        <Imagotype className="logo__imagotype" />
        <div className="logo__text-wrapper">
          <h1 className="logo__title">
            Just
            {logOrRegister}
          </h1>
          <p className="logo__sub-title">Simplifying To Dos</p>
        </div>
      </section>

      <LoginRegisterForm
        userState={userState}
        logOrRegister={logOrRegister}
      />

      <LogOrRegister
        setLogOrRegister={setLogOrRegister}
        isLoginOrRegister={logOrRegister}
      />
    </article>
  );
};

export default WelcomePage;
