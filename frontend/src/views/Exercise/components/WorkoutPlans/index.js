import { useState, useEffect } from 'react';
import PlanDropdown from '../../../../components/PlanDropdown';
import PopUpContainer from "../../../../components/PopUpContainer";
import EditDropDownPopUp from '../../../../components/PlanDropdown/Components/EditDropDownPopUp';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import useWorkoutPlans from '../../../../hooks/useWorkoutPlans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import "./index.scss";

const WorkoutPlans = ({ setSelectedPlan, selectedPlan }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const { setWorkoutPlans } = useWorkoutPlans();
  const axiosPrivate = useAxiosPrivate();

  const addPlan = async (name, description) => {
    const plan = { name, description }
    try {
      const response = await axiosPrivate.post("workouts/workoutPlans/", plan);
      const id = response.data.planId;
      setWorkoutPlans(prevPlans => [...prevPlans, { id, name, description }]);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleSave = async (name, description) => {
    await addPlan(name, description);
  };

  return (
    <div className='workout-plan-container'>
      <PlanDropdown onSelect={(e) => setSelectedPlan(e)} selectedValue={selectedPlan} />
      <button id="add-plan-button" onClick={() => setIsPopUpVisible(true)}>
        <FontAwesomeIcon icon={faCirclePlus} />
      </button>
      <PopUpContainer display={isPopUpVisible} onClose={() => setIsPopUpVisible(false)}>
        <EditDropDownPopUp
          onClose={() => setIsPopUpVisible(false)}
          handleSave={handleSave}
          isEditing={false}
        />
      </PopUpContainer >
    </div>

  )
}

export default WorkoutPlans