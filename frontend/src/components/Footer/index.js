import moment from 'moment';
import './index.scss';

/**
 * Footer component.
 * 
 */
const Footer = () => {
  const currentYear = moment().year();
  return (
    <footer> {currentYear} &copy; Created by Colton Hagan</footer>
  )
}

export default Footer