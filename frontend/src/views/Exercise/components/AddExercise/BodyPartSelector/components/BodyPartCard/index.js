import PropTypes from 'prop-types';
import iconMapping from './components/iconMapping';
import { CapitalizeWords } from '../../../../../../../util/CapitalizeWords';
import './index.scss';

/**
 * Component to display a card representing a body part.
 * @param {string} bodyPart - The name of the body part to display.
 * @param {function} onClick - Callback when the card is clicked.
 * @param {boolean} isSelected - Indicates if the body part is currently selected.
 */
const BodyPartCard = ({ bodyPart, onClick, isSelected }) => {
    const Icon = iconMapping[bodyPart] || iconMapping['other'];

    return (
        <div className={`bodyPartCard ${isSelected ? 'selected' : ''}`} tabIndex={0} onClick={() => onClick(bodyPart)}>
            {Icon && <div className="icon">{Icon}</div>}
            {CapitalizeWords(bodyPart)}
        </div>
    );
};

// PropTypes validation
BodyPartCard.propTypes = {
    bodyPart: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool
};

export default BodyPartCard;
