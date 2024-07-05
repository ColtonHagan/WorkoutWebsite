import { useState, useEffect } from 'react';
import './index.scss';
import ExcerciseCard from './components/ExerciseCard';
import ExercisePopUp from '../ExercisePopUp';
import DateHeading from './components/DateHeading';
import Calendar from 'react-calendar';
import moment from 'moment';
import useGetWorkoutPlans from '../../hooks/useGetWorkoutPlans';
import PlanDropdown from '../../components/PlanDropdown';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const Home = () => {
  const [workoutPlans] = useGetWorkoutPlans();
  const [exercises, setExercises] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [dateState, setDateState] = useState(new Date());
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => { //sets to first workPlan when page loads
    if (workoutPlans.length > 0) {
      setSelectedPlan(workoutPlans[0].id);
    }
  }, [workoutPlans]);

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
  }, [selectedPlan]);

  const filteredExercises = exercises.filter(exercise => {
    const exerciseDate = exercise.dates && exercise.dates.includes(moment(dateState).format('YYYY-MM-DD'));
    const selectedDay = moment(dateState).format('dddd');
    return exerciseDate || (exercise.days && exercise.days.includes(selectedDay));
  });

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const isWorkoutDate = exercises.some(exercise =>
        exercise.dates.includes(dateStr) ||
        (exercise.days && exercise.days.includes(moment(date).format('dddd')))
      );
      return isWorkoutDate ? 'highlighted-date' : null;
    }
    return null;
  };


  return (
    <div className="exercise-page">
      <div className='calendar'> {/* should be later moved into seperate file */}
        <PlanDropdown options={workoutPlans} onSelect={(planId) => setSelectedPlan(planId)} selectedPlan={selectedPlan} />
        <Calendar value={dateState} onChange={(date) => setDateState(date)} tileClassName={tileClassName} />
      </div>
      <div className="date-container">
        <h1> <DateHeading date={dateState} />'s Workout</h1> 
        <div className='card-container'> {/* should be later moved into seperate file */}
          {filteredExercises.length > 0 ? (
            filteredExercises.map((exercise, index) => (
              <ExcerciseCard
                key={index}
                exercise={exercise}
                onClick={() => setSelectedExercise(exercise)}
              />
            ))
          ) : (
            <p>Resting</p>
          )}
          {selectedExercise && (
            <ExercisePopUp
              exercise={selectedExercise}
              onClose={() => setSelectedExercise(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
