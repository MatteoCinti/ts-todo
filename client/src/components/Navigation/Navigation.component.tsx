import {ReactComponent as Imagotype} from '../../images/Imagotype.svg'

const Navigation = () => (
  <nav className='navigation'>
    <Imagotype className='navigation__imagotype'/>
    <h3 className='navigation__title'>Just Do It</h3>
    <p className='navigation__logout'>Log out</p>
  </nav>
)

export default Navigation;  