import React from 'react'
import AddExerciseCard from './components/AddExerciseCard'
import "./index.scss";

const ExerciseList = ({exercises}) => {
  return (
    <div className='addExerciseContainer'>
      <h3>Exercises</h3>
      <img></img>
      <div className='exerciseList'>
        {exercises.map(exercise => (
            <AddExerciseCard key={exercise.id} exercise={exercise}/>
        ))}
      </div>
    </div>
  )
}

export default ExerciseList