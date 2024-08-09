import { useState, useEffect } from 'react';
import AddWorkoutPlanPopUp from "./components/AddWorkoutPlanPopUp";
import PlanDropdown from '../../../../components/PlanDropdown';
import "./index.scss";

//use CONTEXT

const WorkoutPlans = ({ setSelectedPlan, selectedPlan }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);

  return (
    <div className='workout-plan-container'>
      <PlanDropdown onSelect={(e) => setSelectedPlan(e)} selectedValue={selectedPlan}/>
      <button onClick={() => setIsPopUpVisible(true)}>Add</button>
      {isPopUpVisible && (
        <AddWorkoutPlanPopUp
          onClose={() => {
            setIsPopUpVisible(false);
          }}
        />
      )}
    </div>

  )
}

export default WorkoutPlans