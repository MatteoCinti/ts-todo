import { RegisterLogin } from "../../state/user/user.interfaces";
import { FormProps } from "../Form/Form.interfaces";
import './LogOrRegister.styles.scss';

interface IComponentProps { 
  isLoginOrRegister: RegisterLogin;
  setLogOrRegister: React.Dispatch<React.SetStateAction<RegisterLogin>>;
}

const LogOrRegister: React.FC<IComponentProps> = ({
  isLoginOrRegister,
  setLogOrRegister
}) => (

  <p className="form-switch bold">
    {isLoginOrRegister === RegisterLogin.register
      ? 'Alredy' 
      : `Don't`
    } have an account?
    <span 
      className='form-switch__link'
      onClick={
        isLoginOrRegister === RegisterLogin.register 
          ? () => setLogOrRegister( RegisterLogin.login )
          : () => setLogOrRegister( RegisterLogin.register)
      }
    >
      {
      isLoginOrRegister === RegisterLogin.register
       ? ' Login '
       : ' Register '} 
       Here
    </span>
  </p>
)

export default LogOrRegister