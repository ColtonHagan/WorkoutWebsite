import React, { useState } from 'react';
import "./index.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'

const ExerciseCard = ({ name, sets, reps, weight, category }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={"exercise-item" + (isChecked ? " checked" : "")}>
            <div className="category-info">{category}</div>
            <h1>{name}</h1>
            <div>Count: {sets} sets X {reps} reps</div>
            <div className='weight-info'>
                <FontAwesomeIcon icon={faDumbbell} />
                {weight}lbs
                <label className="checkbox-container">
                    <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <span className="checkmark"></span>
                </label>
            </div>
        </div>
    )
}

export default ExerciseCard;
