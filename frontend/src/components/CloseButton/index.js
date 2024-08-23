import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.scss'; 

const CloseButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className="close-button" onClick={handleClick} aria-label="Close">
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

export default CloseButton;
