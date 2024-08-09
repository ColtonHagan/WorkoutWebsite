//maybe these should be moved into a seperate apit file
import { useState, useEffect } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useFetchWorkoutPlans = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            try {
                const response = await axiosPrivate.get("workouts/workoutPlans/");
                setWorkoutPlans(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWorkoutPlans();
    }, []);

    return { workoutPlans, setWorkoutPlans };
};

export default useFetchWorkoutPlans;