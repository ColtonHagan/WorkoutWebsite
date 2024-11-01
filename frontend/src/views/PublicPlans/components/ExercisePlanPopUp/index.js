import { useState } from 'react';
import PropTypes, { object } from 'prop-types';
import PopUpContainer from '../../../../components/PopUpContainer';
import BackButton from '../../../../components/BackButton';
import WeeklyDisplay from '../../../../components/WeeklyDisplay';
import ExercisePopUp from '../../../../components/ExercisePopUp';
import "./index.scss";

/**
 * ExercisePlanPopUp Component - Displays a popup for viewing and downloading an exercise plan.
 * Users can view weekly exercises or click into a specific exercise.
 * 
 * @component
 * @param {Object} plan - The exercise plan object to be displayed.
 * @param {Array} exercises - The list of exercises associated with the plan.
 * @param {function} onClose - Callback function to close the popup.
 * @param {function} downloadPlan - Callback function to handle plan download.
 */
const ExercisePlanPopUp = ({ plan, exercises, onClose, downloadPlan }) => {
    const [currentView, setCurrentView] = useState('plan');
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
        downloadPlan(plan);
        onClose();
    }

    return (
        <PopUpContainer display={exercises} onClose={handleCloseClick} size={currentView === 'plan' ? "medium" : "large"}>
            {currentView === 'plan' ? (
                <div className="weekly-display-container">
                    <h1>{plan?.name}</h1>
                    <WeeklyDisplay
                        exercises={exercises}
                        onExerciseClick={handleExerciseClick}
                        onDelete={null}
                    />
                    {exercises?.length > 0 && <button className="button download" onClick={onAdd}> Download Plan </button>}
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
// Define PropTypes for the component
ExercisePlanPopUp.propTypes = {
    plan: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    }),
    exercises: PropTypes.arrayOf(object),
    onClose: PropTypes.func.isRequired,
    downloadPlan: PropTypes.func.isRequired,
};

export default ExercisePlanPopUp;
