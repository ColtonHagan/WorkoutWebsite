import { useContext } from 'react';
import PlanContext from '../context/WorkoutPlansProvider';

const useWorkoutPlans = () => {
  const context = useContext(PlanContext);
  return context;
}

export default useWorkoutPlans;