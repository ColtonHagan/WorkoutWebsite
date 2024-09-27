import { useState } from "react";
import AddExercise from "./components/AddExercise";
import WeeklyDisplay from "../../components/WeeklyDisplay";
import WorkoutPlans from "./components/WorkoutPlans";
import PopUpContainer from "../../components/PopUpContainer";
import ExercisePopUp from "../../components/ExercisePopUp";
import useWorkoutService from "../../services/useWorkoutService";
import useWorkouts from "../../hooks/useWorkouts";

/**
 * Main component for managing exercises/workouts
 */
const Exercise = () => {
  const { deleteWorkout, addWorkout } = useWorkoutService();
  const [ selectedPlan, setSelectedPlan ] = useState(-1);
  const [ selectedExercise, setSelectedExercise ] = useState();
  const { workouts, setWorkouts } = useWorkouts();

  /**
   * Adds an exercise to the workout plan.
   *
   * @param {Object} exercise - The exercise to add.
   */
  const addExercise = async (exercise) => {
    try {
      const response = await addWorkout(exercise, selectedPlan);
      exercise.id = response;
      setWorkouts(prevWorkouts => [...prevWorkouts, exercise]);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  /**
   * Deletes an exercise from the workout plan.
   *
   * @param {number} id - The ID of the exercise to delete.
   */
  const deleteExercise = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts(prevWorkouts => prevWorkouts.filter(exercise => exercise.id !== id));
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <WorkoutPlans setSelectedPlan={(plan) => setSelectedPlan(plan)} selectedPlan={selectedPlan} />
      <WeeklyDisplay exercises={workouts} deleteWorkout={(id) => deleteExercise(id)} onExerciseClick={(exercise) => setSelectedExercise(exercise)}/>
      <AddExercise addExercise={(exercise) => addExercise(exercise)}  />
      <PopUpContainer display={selectedExercise}  onClose={() => setSelectedExercise(null)}>
        <ExercisePopUp exercise={selectedExercise}/>
      </PopUpContainer>
    </div>
  )
}

export default Exercise