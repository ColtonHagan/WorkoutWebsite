import { useContext } from 'react';
import WorkoutsContext from '../context/WorkoutProvider';

/**
 * Custom hook to access the workouts context.
 */
const useWorkouts = () => {
    const context = useContext(WorkoutsContext);
    return context;
};

export default useWorkouts;
