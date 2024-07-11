import React from 'react';
import './index.scss';

const BodyPartCard = ({ bodyPart, onClick, isSelected }) => {
    return (
        <div className={`bodyPartCard ${isSelected ? 'selected' : ''}`} onClick={() => onClick(bodyPart)}>
            {bodyPart}
        </div>
    );
};

export default BodyPartCard;
