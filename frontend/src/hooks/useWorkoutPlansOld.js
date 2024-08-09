import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useWorkoutPlans = () => {
  const axiosPrivate = useAxiosPrivate();
  const [workoutPlans, setWorkoutPlans] = useState([]);

  const fetchWorkoutPlans = async () => {
    try {
      const response = await axiosPrivate.get("workouts/workoutPlans/");
      setWorkoutPlans(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addPlan = async (plan) => {
    try {
      await axiosPrivate.post("workouts/workoutPlans/", plan);
      console.log("Adding ", plan.name);
      fetchWorkoutPlans(); 
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  useEffect(() => {
    fetchWorkoutPlans();
  }, []);


  return { workoutPlans, addPlan };
};

export default useWorkoutPlans;
