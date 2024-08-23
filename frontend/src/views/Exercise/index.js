import { useState, useEffect } from "react";
import AddExercise from "./components/AddExercise";
import WeeklyDisplay from "./WeeklyDisplay";
import WorkoutPlans from "./components/WorkoutPlans";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PopUpContainer from "../../components/PopUpContainer";
import ExercisePopUp from "../ExercisePopUp";

const Exercise = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [exercises, setExercises] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchExercises = async (planId) => {
      try {
        const response = await axiosPrivate.get(`workouts/${planId}/workout`); /* should be moved to seperate api file */
        setExercises(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    selectedPlan && fetchExercises(selectedPlan);
    console.log(exercises);
  }, [selectedPlan]);

  const addExercise = async (exercise) => {
    exercise.plan_id = selectedPlan;
    try {
      const response = await axiosPrivate.post("workouts/", exercise);
      console.log(response.data);
      exercise.id = response.data;
      setExercises(prevExercises => [...prevExercises, exercise]);
      console.log("Workout added:", exercise);

    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const deleteExercise = async (id) => {
    console.log("attempting to delete ", id);
    try {
      await axiosPrivate.delete(`workouts/${id}`);
      setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
      console.log('Workout deleted:', id);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <WorkoutPlans setSelectedPlan={(plan) => setSelectedPlan(plan)} selectedPlan={selectedPlan} />
      {/* add safty check here to check if it can conect to external workout db */}
      <WeeklyDisplay exercises={exercises} deleteWorkout={(id) => deleteExercise(id)} onExerciseClick={(exercise) => setSelectedExercise(exercise)}/>
      <AddExercise addExercise={(exercise) => addExercise(exercise)}  />
      <PopUpContainer display={selectedExercise} onClose={() => setSelectedExercise(null)}>
        <ExercisePopUp exercise={selectedExercise}/>
      </PopUpContainer>
    </div>
  )
}

export default Exercise