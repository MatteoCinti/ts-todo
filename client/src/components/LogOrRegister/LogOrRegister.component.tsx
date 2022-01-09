import { RegisterLogin } from "../../state/user/user.interfaces";
import { FormProps } from "../Form/Form.interfaces";
import { ILRHandleClick, ILRComponentProps } from "./LogOrRegister.interfaces";
import './LogOrRegister.styles.scss';

const handleClick = (
  props: ILRComponentProps
) => {
  const { isLoginOrRegister, setLogOrRegister} = props;
  isLoginOrRegister === RegisterLogin.register 
    ? setLogOrRegister(RegisterLogin.register)
    : setLogOrRegister(RegisterLogin.login);
}

const LogOrRegister: React.FC<ILRComponentProps> = ({
  isLoginOrRegister,
  setLogOrRegister
}) => {
  
  return(

  <p className="form-switch bold">
    {isLoginOrRegister === RegisterLogin.register
      ? 'Alredy' 
      : `Don't`
    } have an account?
    <span 
      className='form-switch__link'
      onClick={() => handleClick( {isLoginOrRegister, setLogOrRegister} )}
    >
      {
      isLoginOrRegister === RegisterLogin.register
        ? ' Login '
        : ' Register '} 
        Here
    </span>
  </p>
)}

export default LogOrRegister