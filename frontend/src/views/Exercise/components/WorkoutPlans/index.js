import { useState } from 'react';
import PropTypes from 'prop-types';
import PlanDropdown from '../../../../components/PlanDropdown';
import PopUpContainer from "../../../../components/PopUpContainer";
import DropDownPopUp from '../../../../components/PlanDropdown/Components/DropDownPopUp';
import useWorkoutPlans from '../../../../hooks/useWorkoutPlans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import useWorkoutPlanService from '../../../../services/useWorkoutPlanServices';
import "./index.scss";

/**
 * Component for managing workout plans.
 *
 * @param {function} setSelectedPlan - Function to set the selected workout plan.
 * @param {number} selectedPlan - Currently selected workout plan.
 */
const WorkoutPlans = ({ setSelectedPlan, selectedPlan }) => {
  const [ isPopUpVisible, setIsPopUpVisible ] = useState(false);
  const { setWorkoutPlans } = useWorkoutPlans();
  const { addPlan } = useWorkoutPlanService();

  const addWorkoutPlan = async (name, description) => {
    const plan = { name, description }
    try {
      const response = await addPlan(plan);
      const id = response.planId;
      setWorkoutPlans(prevPlans => [...prevPlans, { id, name, description }]);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleSave = async (name, description) => {
      addWorkoutPlan(name, description);
  };

  return (
    <div className='workout-plan-container'>
      <PlanDropdown onSelect={(e) => setSelectedPlan(e)} selectedValue={selectedPlan} />
      <button id="add-plan-button" onClick={() => setIsPopUpVisible(true)}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </button>
      <PopUpContainer display={isPopUpVisible} onClose={() => setIsPopUpVisible(false)}>
        <DropDownPopUp
          onClose={() => setIsPopUpVisible(false)}
          handleSave={handleSave}
          isEditing={false}
        />
      </PopUpContainer >
    </div>

  )
}

// PropTypes validation
WorkoutPlans.propTypes = {
  setSelectedPlan: PropTypes.func.isRequired,
  selectedPlan: PropTypes.number.isRequired,
};

export default WorkoutPlans