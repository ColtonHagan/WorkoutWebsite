import { useContext } from 'react';
import PlanContext from '../context/WorkoutPlansProvider';

/**
 * Custom hook to access the workout plans context.
 */
const useWorkoutPlans = () => {
  const context = useContext(PlanContext);
  return context;
}

export default useWorkoutPlans;