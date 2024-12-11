import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';



const Button = ({icon,path,name}) => {
  return (
   
    <Link to={path} className='flex bg-primary w-[120px] h-[40px] mx-[5px] font-light text-lg flex text-sm justify-center text-tertiary hover:bg-transparent rounded hover:text-primary hover:outline hover:outline-[2px] hover:outline-secondary '>
    <div className="flex w-full h-full justify-center items-center">
    <span className='text-center text-md font-semibold'>{name}</span>
    <span className='m-[5px]'>{icon}</span>
    </div>
 
    </Link>
  )
}
Button.propTypes = {
    icon: PropTypes.node.isRequired, 
    path: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object 
  };
  

export default Button