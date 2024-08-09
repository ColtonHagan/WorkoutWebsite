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
    const viewportWidth = useViewportWidth();

    const handleCheckboxChange = (e) => {
        e.stopPropagation();
        setIsChecked(e.target.checked);
    };

    //temp using until I updated add exercise to db forcing capalization 
    const capitalizeFirstLetter = (str) => {
        return str
            .split(' ') // Split the string into words
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize the first letter and lowercase the rest
            )
            .join(' '); // Join the words back into a single string
    };

    const truncateName = (name) => {
        //this I will update to change with height
        const fontSizeEm = 2.5;
        const containerWidthVw = 20;
        const maxLines = 1;

        const containerWidthPx = (containerWidthVw / 100) * viewportWidth;
        const fontSizePx = fontSizeEm * 16;
        const averageCharWidthPx = 0.6 * fontSizePx;
        const maxLength = Math.floor(containerWidthPx / averageCharWidthPx) * maxLines;

        if (name.length <= maxLength) return name;

        const truncatedName = name.slice(0, maxLength);

        const lastSpaceIndex = truncatedName.lastIndexOf(' ');
        if (lastSpaceIndex === -1) return truncatedName + '...';

        return truncatedName.slice(0, lastSpaceIndex) + '...';
    };

    return (
        <div className={"exercise-item" + (isChecked ? " checked" : "")} onClick={onClick}>
            <div className='tags'>
                <p>#{capitalizeFirstLetter(exercise.body_part)}</p>
                <p>#{capitalizeFirstLetter(exercise.target_muscle)}</p>
            </div>
            <h1>{truncateName(capitalizeFirstLetter(exercise.name))}</h1>
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
