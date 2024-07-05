import { useState } from "react";
import PlanDropdown from "../../components/PlanDropdown";
import useGetWorkoutPlans from "../../hooks/useGetWorkoutPlans";
import AddExercise from "./components/AddExercise";
const Exercise = () => {
  const [workoutPlans] = useGetWorkoutPlans();
  const [selectedPlan, setSelectedPlan] = useState("");

  return (
    <div>
      {/*Workout plan dropdown and create new workout plan*/}
      <PlanDropdown options={workoutPlans} onSelect={(planId) => setSelectedPlan(planId)} selectedPlan={selectedPlan} /> {/*maybe update with creatable here to be able to create new plan*/}
      {/*See brief editable overview of current exercises*/}

      {/*Page to add new exercises*/}
      <AddExercise/>
    </div>
  )
}

export default Exercise