import { FormProps } from "../Form/Form.interfaces";

interface IComponentProps { 
  isLoginOrRegister: FormProps['isLoginOrRegister'];
  setLogOrRegister: React.Dispatch<React.SetStateAction<"Login" | "Register">>;
}

const LogOrRegister: React.FC<IComponentProps> = ({
  isLoginOrRegister,
  setLogOrRegister
}) => (

  <p className="form-switch">
    {isLoginOrRegister === 'Register' 
      ? 'Alredy' 
      : `Don't`
    } have an account? 
    <span 
      className='form-switch__link'
      onClick={
        isLoginOrRegister === 'Register' 
          ? () => setLogOrRegister('Login')
          : () => setLogOrRegister('Register')
      }
    >
      {isLoginOrRegister} Here
    </span>
  </p>
)

export default LogOrRegister