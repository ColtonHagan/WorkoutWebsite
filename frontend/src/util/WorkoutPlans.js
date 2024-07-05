//tmp temp for testing login authentication

import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

const WorkoutPlans = () => {
    const [WorkoutPlans, setWorkoutPlans] = useState();
    const axiosPrivate = useAxiosPrivate();
    const logout = useLogout();

    useEffect(() => {
        let isMounted = true;
        const fetchWorkoutPlans = async () => {
            try {
                const response = await axiosPrivate.get('workouts/workoutPlans');
                isMounted && setWorkoutPlans(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchWorkoutPlans();

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <div>
            <h2> WorkoutPlans list </h2>
            {WorkoutPlans?.length
                ? (
                    <ul>
                        {WorkoutPlans.map((plan, i) => <li key={i}>{plan?.name}</li>)}
                    </ul>
                ) : <p> No Workout Plans </p>
            }
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default WorkoutPlans