import React, { useState } from 'react';
import './index.scss';
import ExcerciseCard from './components/ExerciseCard';
import ExercisePopUp from '../ExercisePopUp';
import DateHeading from './components/DateHeading';
import Calendar from 'react-calendar';
import moment from 'moment';

const Home = () => {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [dateState, setDateState] = useState(new Date());

  const exerciseArray = [
    {
      name: "Squats",
      sets: 3,
      reps: 8,
      weight: 225,
      category: "Legs",
      date: "05/30/2024",
      daily: []
    },
    {
      name: "Bench",
      sets: 3,
      reps: 8,
      weight: 135,
      category: "Chest",
      date: null,
      daily: ["Monday", "Friday"]
    },
    {
      name: "Curls",
      sets: 3,
      reps: 8,
      weight: 80,
      category: "Arms",
      date: null,
      daily: ["Monday"]
    },
    {
      name: "Leg Press",
      sets: 3,
      reps: 8,
      weight: 1250,
      category: "Legs",
      date: "05/30/2024",
      daily: []
    },
  ];

  const handleCardClick = (exercise) => {
    setSelectedExercise(exercise);
  };

  const changeDate = (date) => {
    setDateState(date);
  };

  const filteredExercises = exerciseArray.filter(exercise => {
    const exerciseDate = exercise.date ? moment(exercise.date, 'MM/DD/YYYY').startOf('day') : null;
    const selectedDay = moment(dateState).format('dddd');
    return (exerciseDate && exerciseDate.isSame(dateState, 'day')) || exercise.daily.includes(selectedDay);
  });

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('MM/DD/YYYY');
      const isWorkoutDate = exerciseArray.some(exercise =>
        exercise.date === dateStr ||
        exercise.daily.includes(moment(date).format('dddd'))
      );
      return isWorkoutDate ? 'highlighted-date' : null;
    }
    return null;
  };

  return (
    <div className="exercise-page">
      <div className='calendar'>
        <Calendar value={dateState} onChange={changeDate} tileClassName={tileClassName} />
      </div>
      <div className="date-container">
        <h1><DateHeading date={dateState}/>'s Workout</h1>
        <div className='card-container'>
          {filteredExercises.map((exercise, index) => (
            <ExcerciseCard
              key={index}
              exercise={exercise}
              onClick={() => handleCardClick(exercise)}
            />
          ))}
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
