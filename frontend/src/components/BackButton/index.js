import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './index.scss';  // Import the SCSS file

const BackButton = ({ onClick }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button className="back-button" onClick={handleClick} aria-label="Back">
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
};

export default BackButton;