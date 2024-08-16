import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDumbbell } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import "./index.scss";

//if this stays move it into its own hooks
const useViewportWidth = () => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        // Cleanup 
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewportWidth;
};

const ExerciseCard = ({ exercise, onClick }) => {
    const [isChecked, setIsChecked] = useState(false);

    console.log(exercise.nickname)

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        setIsChecked(e.target.checked);
    };

    return (
        <div className={"exercise-item" + (isChecked ? " checked" : "")} onClick={onClick}>
            <div className='tags'>
                <p>#{exercise.body_part}</p>
                <p>#{exercise.target_muscle}</p>
            </div>
            <h1 className='ellipsis'>{exercise.nickname}</h1>
            <div >
                <div className='exercise-count'><strong>Count: </strong> {exercise.sets} Sets x {exercise.reps} Reps</div>
                <div className='weight-info'>
                    <FontAwesomeIcon icon={faDumbbell} />
                    &nbsp;{exercise.weight} <span className='small-text'>lbs</span>
                </div>
            </div>
            <div className="checkbox-container">
                <input type="checkbox" name="checkbox" defaultChecked={isChecked} onClick={handleCheckboxChange} />
            </div>
        </div>
    )
}

export default ExerciseCard;
