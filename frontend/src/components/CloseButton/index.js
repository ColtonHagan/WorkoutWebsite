import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.scss';  // Import the SCSS file

const CloseButton = ({ onClick }) => {
  return (
    <button className="close-button" onClick={onClick} aria-label="Close">
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

export default CloseButton;
