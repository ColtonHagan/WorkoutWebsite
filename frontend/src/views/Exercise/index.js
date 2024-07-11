import { useState, useEffect } from "react";
import PlanDropdown from "../../components/PlanDropdown";
import useGetWorkoutPlans from "../../hooks/useGetWorkoutPlans";
import AddExercise from "./components/AddExercise";
const Exercise = () => {
  const [workoutPlans] = useGetWorkoutPlans();
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => { //this should be combinned into a hook probably
    if (workoutPlans.length > 0) {
      setSelectedPlan(workoutPlans[0].id);
    }
  }, [workoutPlans]);

  return (
    <div>
      {/*Workout plan dropdown and create new workout plan*/}
      <PlanDropdown options={workoutPlans} onSelect={(planId) => setSelectedPlan(planId)} /> {/*maybe update with creatable here to be able to create new plan*/}
      {/*See brief editable overview of current exercises*/}

      {/*Page to add new exercises*/}
      <AddExercise selectedPlan={selectedPlan}/>
    </div>
  )
}

export default Exercise