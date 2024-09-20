import "./index.scss";
import moment from "moment";
import CloseButton from "../../../../../components/CloseButton";

const SimpleExerciseCard = ({ exercise, onDelete = null, onExerciseClick }) => {
    const nextDate = exercise.dates.find(date => moment(date).isAfter(moment(), 'day'));
    const formattedNextDate = nextDate ? moment(nextDate).format("MM/DD/YY") : "";
    return (
        <>
            <div className="exercise-container" onClick={() => onExerciseClick(exercise)}>
                <div id="name" className="ellipsis">{exercise.nickname}</div>
                <div id="next-date">{formattedNextDate}</div>
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

export default SimpleExerciseCard;