import React, { SetStateAction, useState } from "react";

import "./Welcome.styles.scss";
import UserForm from "../../components/Form/UserForm.component";
import TextInput from "../../components/TextInput/TextInput.component";
import {ReactComponent as Imagotype} from '../../images/Imagotype.svg'
import { useAppSelector } from "../../state/hooks";
import LogOrRegister from "../../components/LogOrRegister/LogOrRegister.component";
import { RegisterLogin } from "../../state/user/user.interfaces";

const WelcomePage = () => {
  const userState = useAppSelector(state => state.user);
  const { error } = userState;
  const [logOrRegister, setLogOrRegister] = useState<RegisterLogin>(RegisterLogin.login);

  return (
    <article className="welcome-page">

      <section className='logo'>
        <Imagotype className='logo__imagotype'/>
        <div className='logo__text-wrapper'>
          <h1 className='logo__title'>Just {logOrRegister}</h1>
          <p className='logo__sub-title'>Simplifying To Dos</p>
        </div>
      </section>

      <UserForm 
        ariaLabel='user-form'
        cssClass='user-form'
        isLoginOrRegister={logOrRegister}
        state={userState}
        buttonValue={logOrRegister}
      >
        <TextInput 
          type='text'
          name='username'
          cssClass='username-form'
          innerText='Enter Your Username' 
          // todoState={[]}        
        />
        <>
          {error && <p>{userState.errorMessage}</p>}
        </>
     
         <TextInput 
          type='password'
          name='password'
          cssClass='user-form'
          innerText='Enter Your Password' 
          // todoState={[]}        
        />
        
      </UserForm>
        <LogOrRegister 
          setLogOrRegister={setLogOrRegister} 
          isLoginOrRegister={logOrRegister}
        />
   
    </article >
  )
}

export default WelcomePage;