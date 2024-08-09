import "./index.scss";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const SimpleExerciseCard = ({ exercise, onDelete }) => {
    const nextDate = exercise.dates.find(date => moment(date).isAfter(moment(), 'day'));
    const formattedNextDate = nextDate ? moment(nextDate).format("MM/DD/YY") : "";
    return (
        <div className="exercise-container">
            <div>{exercise.name}</div>
            <div>{formattedNextDate}</div>
            <div className="delete-button" onClick={() => onDelete(exercise.id)}>
                <FontAwesomeIcon icon={faX} />
            </div>
        </div>
    );
};

export default SimpleExerciseCard;