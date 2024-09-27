import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
import './index.scss';  // Import the SCSS file

/**
 * BackButton component that renders a button for navigating back.
 *
 * @param {function} onClick - Function to call when the button is clicked
 */
const BackButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className="back-button" onClick={handleClick} aria-label="Back">
      <FaArrowLeft />
    </button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};


export default BackButton;