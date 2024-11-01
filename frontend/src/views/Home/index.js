import { useState, useMemo } from 'react';
import WorkoutCard from './components/WorkoutCard';
import ExercisePopUp from '../../components/ExercisePopUp';
import DateHeading from './components/DateHeading';
import Calendar from 'react-calendar';
import moment from 'moment';
import PlanDropdown from '../../components/PlanDropdown';
import PopUpContainer from '../../components/PopUpContainer';
import { FaBed } from "react-icons/fa";
import { TbZzz } from "react-icons/tb";
import useWorkoutService from '../../services/useWorkoutService';
import useWorkouts from '../../hooks/useWorkouts';
import './index.scss';

/**
 * Home component serves as the main page for displaying workouts and scheduling.
 *
 */
const Home = () => {
  const { workouts, setWorkouts } = useWorkouts();
  const [selectedPlan, setSelectedPlan] = useState(-1);
  const [selectedExercise, setSelectedExercise] = useState();
  const [dateState, setDateState] = useState(new Date());
  const { editWorkout } = useWorkoutService();

  // Filters workouts
  const filteredWorkouts = useMemo(() => {
    return workouts.filter(exercise => {
      const exerciseDate = exercise.dates && exercise.dates.includes(moment(dateState).format('YYYY-MM-DD'));
      const selectedDay = moment(dateState).format('dddd');
      return exerciseDate || (exercise.days && exercise.days.includes(selectedDay));
    });
  }, [workouts, dateState]);

  /** Applies what calander days should be highlighed due to workout
    * 
    * @param {Date} date - The date of the calendar tile.
    * @param {string} view - The current view of the calendar ('month', etc.).
    * @returns {string|null} Returns 'highlighted-date' if the date has workouts, otherwise null.
    */
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const isWorkoutDate = workouts.some(exercise =>
        exercise.dates.includes(dateStr) ||
        (exercise.days && exercise.days.includes(moment(date).format('dddd')))
      );
      return isWorkoutDate ? 'highlighted-date' : null;
    }
    return null;
  };

  /**
   * Updates the selected exercise with new values.
   * 
   * @param {Object} exercise - The updated exercise containing reps, sets, days, and dates
   */
  const updateExercise = async (exercise) => {
    try {
      const response = await editWorkout(selectedExercise.id, exercise);
      const newId = response.id;
      setWorkouts(prevWorkouts =>
        prevWorkouts.map(workout =>
          workout.id === newId
            ? {
              ...workout,
              sets: exercise.sets,
              reps: exercise.reps,
              weight: exercise.weight,
              days: exercise.days,
              date: exercise.date
            }
            : workout
        )
      );
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="exercise-page">
      <div className='calendar-container'>
        <PlanDropdown onSelect={(planId) => setSelectedPlan(planId)} selectedValue={selectedPlan} />
        <Calendar className="calendar" value={dateState} onChange={(date) => setDateState(date)} tileClassName={tileClassName} />
      </div>
      <div className="date-container">
        <h1 className='date-heading'> <DateHeading date={dateState} />'s Workout</h1>
        <div className='card-container'>
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((exercise, index) => (
              <WorkoutCard
                key={index}
                exercise={exercise}
                onClick={() => setSelectedExercise(exercise)}
              />
            ))
          ) : (
            <div className='resting'>
              <TbZzz />
              <FaBed className='bed-icon'/>
              <p>Resting</p>
            </div>
          )}
          <PopUpContainer display={selectedExercise} onClose={() => setSelectedExercise(null)} size = "large">
            <ExercisePopUp
              exercise={selectedExercise}
              onClose={() => setSelectedExercise(null)}
              onSubmit={updateExercise}
            />
          </PopUpContainer >
        </div>
      </div>
    </div>
  );
}

export default Home;
