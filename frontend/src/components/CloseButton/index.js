import PropTypes from 'prop-types';
import { FaTimes } from 'react-icons/fa';
import './index.scss'; 

/**
 * A button component that triggers a close action.
 * 
 * @param {function} onClick - The function to call when the button is clicked
 */
const CloseButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className="close-button" onClick={handleClick} aria-label="Close">
      <FaTimes />
    </button>
  );
};

// Prop types validation
CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CloseButton;
