import React, { useState } from 'react';
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

const ExerciseCard = ({ exercise, onClick}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        setIsChecked(!isChecked);
    };

    return (
        <div className={"exercise-item" + (isChecked ? " checked" : "")} onClick={onClick}>
            <div className="category-info">{exercise.category}</div>
            <h1>{exercise.name}</h1>
            <div>Count: {exercise.sets} sets X {exercise.reps} reps</div>
            <div className='weight-info'>
                <FontAwesomeIcon icon={faDumbbell} />
                {exercise.weight}lbs
                <label className="checkbox-container">
                    <input type="checkbox" checked={isChecked} onClick={handleCheckboxChange} />
                    <span className="checkmark"></span>
                </label>
            </div>
        </div>
    )
}

export default ExerciseCard;
