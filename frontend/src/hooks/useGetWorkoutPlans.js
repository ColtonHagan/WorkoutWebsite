import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetWorkoutPlans = () => {
  const axiosPrivate = useAxiosPrivate();
  const [workoutPlans, setWorkoutPlans] = useState([]);

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axiosPrivate.get("workouts/workoutPlans");
        setWorkoutPlans(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkoutPlans();
  }, [/*Something should be here maybe*/]);

  return [workoutPlans, setWorkoutPlans];
};

export default useGetWorkoutPlans;
