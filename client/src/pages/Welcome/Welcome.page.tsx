import { SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../components/Form/Form.component";
import TextInput from "../../components/TextInput/TextInput.component";
import { useAppSelector } from "../../state/hooks";


const WelcomePage = () => {
  const userState = useAppSelector(state => state.user)

  return (
    <>
      <Form 
        ariaLabel='username-form'
        cssClass='username-form'
        setStateFunction='setUsername'
        stateKey='username'
        elementState={userState}
      >
        <TextInput 
          type='text'
          name='username'
          cssClass='username-form'
          placeholder='Enter Your Username' 
          // todoState={[]}        
        />
      </Form>
    </>
  )
}

export default WelcomePage;