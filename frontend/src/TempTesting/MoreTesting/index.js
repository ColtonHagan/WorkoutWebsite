import React, { useEffect, useState } from 'react'
import useWorkoutService from '../../services/useWorkoutService';
import useWorkouts from '../../hooks/useWorkouts';
import Popup from './util/popup';

const MoreTesting = () => {
    const { editWorkout } = useWorkoutService();
    const { workouts, setWorkouts } = useWorkouts();
    const [selectedExercise, setSelectedExercise] = useState();
    const [reps, setReps] = useState(workouts[0]?.reps);

    useEffect(() => {
        const fetchWorkouts = async (id) => {
          try {
            const response = await fetchWorkouts(id);
            setWorkouts(response);
          } catch (err) {
            console.error(err); // send to error page if not there
          }
        };
    
        fetchWorkouts(0);
      }, []);

    const updateExercise = async (reps) => {
        console.log(`Updating: ${reps}`);
        console.log("before updating", workouts.reps);
        try {
            const response = await editWorkout(selectedExercise.id, { reps });
            const newId = response.id;
            console.log(newId);
            newId && setWorkouts(prevWorkouts =>
                prevWorkouts.map(workout =>
                    workout.id === newId
                        ? { ...workout, reps }
                        : workout
                )
            );
        } catch (error) {
            console.error("Error sending data:", error);
        }
        console.log("after updating", workouts.reps);
    };

    const handleRepsChange = (e) => {
        setReps(e.target.value);
    };

    return (
        <div>
            {workouts.map((workout, i) => <h1>{`${workout?.name} with ${workout?.reps} reps`}</h1>)}
            <button onClick={() => setSelectedExercise(workouts[0])}> pop-up </button>
            <form>
                <label>
                    Reps:
                    <input
                        type="number"
                        value={reps}
                        onChange={handleRepsChange}
                    />
                </label>
                <button type="button" onClick={updateExercise}>
                    Save
                </button>
            </form>
            {selectedExercise && <Popup onClose={() => setSelectedExercise(null)} workout={selectedExercise} onUpdate={updateExercise} />}
        </div>
    )
}

export default MoreTesting