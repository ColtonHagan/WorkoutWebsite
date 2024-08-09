import React from 'react'
import "./index.scss";

const AddExerciseCard = ({ exercise, onClick }) => {
  return (
    <div className='exercise'>
      <h4>{exercise.name}</h4>
      <img src={exercise.gifUrl}  alt={exercise.name} loading='Lazy'/>
      <button onClick={onClick}>Add Exercise</button>
    </div>
  )
}

export default AddExerciseCard