import { createContext } from 'react';
import useFetchWorkoutPlans from '../hooks/useFetchWorkoutPlans';

/**
 * WorkoutPlans context state.
 */
const WorkoutPlansContext = createContext({});

export const WorkoutPlansProvider = ({ children }) => {
    const { workoutPlans, setWorkoutPlans } = useFetchWorkoutPlans();

    return (
        <WorkoutPlansContext.Provider value={{ workoutPlans, setWorkoutPlans }}>
            {children}
        </WorkoutPlansContext.Provider>
    );
};

export default WorkoutPlansContext;
