import './index.scss';
import iconMapping from './components/iconMapping';
import { CapitalizeWords } from '../../../../../../../util/CapitalizeWords';

const BodyPartCard = ({ bodyPart, onClick, isSelected }) => {
    const Icon = iconMapping[bodyPart] || iconMapping['Other'];

    return (
        <div className={`bodyPartCard ${isSelected ? 'selected' : ''}`} onClick={() => onClick(bodyPart)}>
            {Icon && <div className="icon">{Icon}</div>}
            {CapitalizeWords(bodyPart)}
        </div>
    );
};

export default BodyPartCard;
