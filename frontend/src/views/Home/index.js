import React from 'react'
import './index.scss';
import ExcerciseCard from './components/ExerciseCard';


const Home = () => {
  const exerciseArray = [ /* TODO : REPLACE WITH BACKEND */
    {
      name: "Squats",
      sets: 3,
      reps: 8,
      weight: 225,
      category: "Legs"
    },
    {
      name: "Bench",
      sets: 3,
      reps: 8,
      weight: 135,
      category: "Chest"
    },
  ];
  return (
    <div className="exercise-page">
      <h1> Today's Workout</h1>
      <div className='card-container'>
        {exerciseArray.map((exercise, index) => (
          <ExcerciseCard
            key={index}
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
            weight={exercise.weight}
            category={exercise.category}
          />
        ))}
      </div>
    </div>
  )
}

export default Home