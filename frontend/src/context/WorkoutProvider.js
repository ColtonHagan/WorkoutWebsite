import { createContext, useState } from 'react';

/**
 * Workouts context state.
 */
const WorkoutsContext = createContext({});

export const WorkoutsProvider = ({ children }) => {
    const [ workouts, setWorkouts ] = useState([]);

    return (
        <WorkoutsContext.Provider value={{ workouts, setWorkouts }}>
            {children}
        </WorkoutsContext.Provider>
    );
};

export default WorkoutsContext;