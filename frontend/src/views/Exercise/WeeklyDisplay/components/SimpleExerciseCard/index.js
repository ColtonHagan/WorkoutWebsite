import "./index.scss";
import moment from "moment";
import CloseButton from "../../../../../components/CloseButton";
import ExercisePopUp from "../../../../../views/ExercisePopUp";
import PopUpContainer from "../../../../../components/PopUpContainer";
import { useState } from "react";

const SimpleExerciseCard = ({ exercise, onDelete, onExerciseClick }) => {
    const nextDate = exercise.dates.find(date => moment(date).isAfter(moment(), 'day'));
    const formattedNextDate = nextDate ? moment(nextDate).format("MM/DD/YY") : "";
    return (
        <>
            <div className="exercise-container" onClick={() => onExerciseClick(exercise)}>
                <div>{exercise.nickname}</div>
                <div>{formattedNextDate}</div>
                <div id="delete-button">
                    <CloseButton onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the onClick for the card
                        onDelete(exercise.id);
                    }} />
                </div>
            </div>
        </>
    );
};

export default SimpleExerciseCard;