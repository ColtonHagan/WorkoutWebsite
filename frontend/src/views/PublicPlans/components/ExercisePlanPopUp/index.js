import { useState } from 'react';
import PopUpContainer from '../../../../components/PopUpContainer';
import BackButton from '../../../../components/BackButton';
import WeeklyDisplay from '../../../Exercise/WeeklyDisplay';
import ExercisePopUp from '../../../ExercisePopUp';
import "./index.scss";

const ExercisePlanPopUp = ({ plan, exercises, onClose }) => {
    const [currentView, setCurrentView] = useState('plan'); // 'plan' or 'exercise'
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleExerciseClick = (exercise) => {
        setSelectedExercise(exercise);
        setCurrentView('exercise');
    };

    const handleBackClick = () => {
        setCurrentView('plan');
        setSelectedExercise(null);
    };

    const handleCloseClick = () => {
        handleBackClick();
        onClose();
    };

    const onAdd = () => {
        console.log("adding workout plan");
        onClose();
    }

    return (
        <PopUpContainer display={exercises} onClose={handleCloseClick}>
            <div id="plan-pop-up">
                {currentView === 'plan' ? (
                    <div id="weekly-display-container">
                        <h1>{plan?.name}</h1>
                        <WeeklyDisplay
                            exercises={exercises}
                            onExerciseClick={handleExerciseClick}
                        />
                        <button id="save-button" onClick={onAdd}> Download Plan </button>
                    </div>
                ) : (
                    <>
                        <BackButton onClick={() => handleBackClick()} />
                        <ExercisePopUp
                            exercise={selectedExercise}
                            onClose={onClose}
                            onBackClick={handleBackClick} />
                    </>
                )}
            </div>
        </PopUpContainer >
    );
};

export default ExercisePlanPopUp;
