import "./index.scss";
import moment from "moment";
import PropTypes from "prop-types";
import CloseButton from "../../../CloseButton";

/**
 * SimpleExerciseCard component displays a single exercise with its nickname, next scheduled date
 *
 * @param {Object} exercise - The exercise object 
 * @param {Function} onDelete - Optional function to delete the exercise. If not provided, the delete button will not render.
 * @param {Function} onExerciseClick - Function to handle clicking the exercise card.
 */
const SimpleExerciseCard = ({ exercise, onDelete = null, onExerciseClick }) => {
    // Find the next date for the exercise that is after the current day and format it
    const nextDate = exercise.dates.find(date => moment(date).isAfter(moment(), 'day'));
    const formattedNextDate = nextDate ? moment(nextDate).format("MM/DD/YY") : "";

    return (
        <>
            <div className="exercise-container" onClick={() => onExerciseClick(exercise)}>
                <div className="name ellipsis">{exercise.nickname}</div>
                <div className="next-date">{formattedNextDate}</div>
                {onDelete && (
                    <div>
                        <CloseButton onClick={() => {
                            onDelete(exercise.id);
                        }} />
                    </div>
                )}
            </div>
        </>
    );
};

// PropTypes validation
SimpleExerciseCard.propTypes = {
    exercise: PropTypes.shape({
        nickname: PropTypes.string,
        dates: PropTypes.arrayOf(PropTypes.string),
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }).isRequired,
    onDelete: PropTypes.func,
    onExerciseClick: PropTypes.func.isRequired,
};

export default SimpleExerciseCard;