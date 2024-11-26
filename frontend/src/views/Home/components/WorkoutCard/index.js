import { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Tags from '../../../../components/Tags';
import "./index.scss";

/**
 * ExerciseCard component displays information about a specific exercise.
 *
 * @param {Object} exercise - The exercise data.
 * @param {function} onClick - Function to call when the card is clicked.
 */
const WorkoutCard = ({ exercise, onClick }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        setIsChecked(e.target.checked);
    };

    return (
        <div className={"exercise-item" + (isChecked ? " checked" : "")} onClick={onClick}>
            <Tags bodyPart={exercise.body_part} target={exercise.target} />
            <h1 className='ellipsis'>{exercise.nickname}</h1>
            <div className="cnt-container">
                <div className='exercise-count'><strong>Count: </strong> {exercise.sets} Sets x {exercise.reps} Reps</div>
                <div className='weight-info'>
                    <FontAwesomeIcon icon={faDumbbell} />
                    &nbsp;{exercise.weight} <span className='small-text'>lbs</span>
                </div>
            </div>
            <div className="checkbox-container">
                <input type="checkbox" name="checkbox" aria-label={`Completed ${exercise?.nickname} checkbox`} defaultChecked={isChecked} onClick={handleCheckboxChange} />
            </div>
        </div>
    )
}

// PropTypes validation
WorkoutCard.propTypes = {
    exercise: PropTypes.shape({
        nickname: PropTypes.string.isRequired,
        body_part: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        sets: PropTypes.number.isRequired,
        reps: PropTypes.number.isRequired,
        weight: PropTypes.number.isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default WorkoutCard;
