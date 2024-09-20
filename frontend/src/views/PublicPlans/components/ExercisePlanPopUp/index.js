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
            {currentView === 'plan' ? (
                <div className="weekly-display-container medium-pop-up"> {/** This should be its own file */}
                    <h1>{plan?.name}</h1>
                    <WeeklyDisplay
                        exercises={exercises}
                        onExerciseClick={handleExerciseClick}
                        onDelete={null}
                    />
                    <button id="save-button" onClick={onAdd}> Download Plan </button>
                </div>
            ) : (
                <div className="pop-up-plan-container">
                    <BackButton onClick={() => handleBackClick()} />
                    <ExercisePopUp
                        exercise={selectedExercise}
                        onClose={onClose}
                        onBackClick={handleBackClick} />
                </div>
            )}
        </PopUpContainer >
    );
};

export default ExercisePlanPopUp;
